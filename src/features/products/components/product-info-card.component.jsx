import React, { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import styled from "styled-components";
import star from "../../../../assets/star.js";
import { Favourite } from "../../../components/favourites/favourite.component.jsx";
import { Spacer } from "../../../components/spacer/spacer.component.jsx";
import { Text } from "../../../components/typography/text.component.jsx";
import { convertCurrency } from "../../../utils/currency-converter.js";
import {
  ProductCard,
  ProductCardCover,
  Rating,
  Section,
  SectionEnd,
} from "./product-info-card.styles.jsx";

const renderSvg = (svgString) => {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: svgString }}
      style={{ width: "20px", height: "20px" }}
    />
  );
};

const ProductDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
  padding: 16px;
`;

const ImageContainer = styled.div`
  width: 100%;
  padding-bottom: 16px;
  flex: 0 0 auto;
`;

const PriceContainer = styled.div`
  margin-top: 8px;
  margin-bottom: 16px;
  color: #b12704;
  font-size: 20px;
`;

const AddToCartButton = styled.button`
  background-color: ${(props) => props.theme.colors.brand.primary};
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  font-size: 16px;
  margin-top: 10px;

  &:hover {
    background-color: ${(props) => props.theme.colors.brand.dark};
  }
`;

const ShopLink = styled.a`
  color: ${(props) => props.theme.colors.brand.primary};
  text-decoration: none;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const CarouselImage = styled.img`
  width: 100%;
  height: auto;
  max-height: 300px;
  object-fit: contain;
  margin: 0 auto;
`;

const SingleImage = styled.img`
  width: 100%;
  height: auto;
  max-height: 300px;
  object-fit: contain;
  display: block;
  margin: 0 auto;
`;

const ProductCardWrapper = styled(ProductCard)`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const ProductInfoCard = ({ product = {}, currency = {}, isDetail = false }) => {
  const navigate = useNavigate();
  const location = useLocation();

  currency = Object.keys(currency).length === 0 ? location?.state?.pageCurrency : currency;

  const {
    categoryName = "",
    description = "",
    discount = 0,
    id,
    name,
    pictures = [],
    picture = pictures.length === 1 ? pictures[0] : null,
    price = 0,
    quantity = 0,
    sku,
    shopId,
    shopName,
    shopStatus,
    stars = 0,
  } = product;

  const finalPrice = price - price * (discount / 100);
  const { currencyName, currencyCode = "USD", currencySymbol = "$" } = currency;

  const ratingArray = Array.from(new Array(Math.floor(stars)));
  const [amountInOtherCurrency, setAmountInOtherCurrency] = useState(0);

  const handleConversion = useCallback(async () => {
    try {
      const convertedAmount = await convertCurrency(
        finalPrice,
        "USD",
        currencyCode
      );
      setAmountInOtherCurrency(convertedAmount);
    } catch (error) {
      console.error("Error converting currency:", error);
    }
  }, [finalPrice, currencyCode]);

  useEffect(() => {
    handleConversion();
  }, [handleConversion]);

  const baseImagePath = "/images/";
  const defaultImage = "/images/products/default.jpg";
  const imageUrl = picture ? `${baseImagePath}${picture}` : defaultImage;

  const handleAddToCart = (e) => {
    e.stopPropagation();
    // Add the logic to add the item to the cart
    console.log("Add to cart", product);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <ProductCardWrapper elevation={2}>
      <ImageContainer>
        {isDetail && pictures.length > 1 ? (
          <Slider {...settings}>
            {pictures.map((pic, index) => (
              <div key={index}>
                <CarouselImage src={`${baseImagePath}${pic}`} alt={name} />
              </div>
            ))}
          </Slider>
        ) : (
          <SingleImage
            src={imageUrl}
            alt={name}
          />
        )}
        <Favourite product={product} />
      </ImageContainer>
      <ProductDetails>
        <Text variant="label" style={{ fontWeight: "bold", fontSize: "18px" }}>
          {name}
        </Text>
        <Spacer position="top" size="small">
          <Text variant="body">{description}</Text>
        </Spacer>
        <PriceContainer>
          {`${amountInOtherCurrency} ${currencySymbol}`}
        </PriceContainer>
        <Section>
          <Rating>
            {ratingArray.map((_, i) => (
              <div key={`star-${id}-${i}`}>{renderSvg(star)}</div>
            ))}
          </Rating>
          <SectionEnd>
            <Spacer position="left" size="small">
              <ShopLink
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/shop/${shopId}`);
                }}
              >
                {shopName}
              </ShopLink>
            </Spacer>
          </SectionEnd>
        </Section>
        <AddToCartButton onClick={handleAddToCart}>Add to Cart</AddToCartButton>
      </ProductDetails>
    </ProductCardWrapper>
  );
};

export default ProductInfoCard;
