import { useCallback, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import styled from "styled-components";
import star from "../../../../assets/star.js";
import { Favourite } from "../../../components/favourites/favourite.component.jsx";
import { Spacer } from "../../../components/spacer/spacer.component.jsx";
import { Text } from "../../../components/typography/text.component.jsx";
import { CartContext } from "../../../services/cart/cart.context";
import { ProductsContext } from "../../../services/products/products.context";
import { convertCurrency } from "../../../utils/currency-converter.js";
import {
  ProductCard,
  Rating,
  Section,
  SectionEnd,
} from "./product-info-card.styles.jsx";

const renderSvg = (svgString) => (
  <div
    dangerouslySetInnerHTML={{ __html: svgString }}
    style={{ width: "20px", height: "20px" }}
  />
);

const ProductDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
  padding: 8px 16px;
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 200px; /* Adjusted height */
  padding-bottom: 8px;
  flex: 0 0 auto;
`;

const PriceContainer = styled.div`
  margin-top: 4px;
  margin-bottom: 8px;
  color: #b12704;
  font-size: 18px;
  font-family: "Roboto", sans-serif;
`;

const AddToCartButton = styled.button`
  background-color: ${(props) => props.theme.colors.brand.primary};
  color: white;
  border: none;
  padding: 8px;
  cursor: pointer;
  border-radius: 5px;
  font-size: 14px;
  margin-top: 8px;
  font-family: "Roboto", sans-serif;

  &:hover {
    background-color: ${(props) => props.theme.colors.brand.dark};
  }
`;

const ShopLink = styled.a`
  color: ${(props) => props.theme.colors.brand.primary};
  text-decoration: none;
  cursor: pointer;
  font-family: "Lora", serif;

  &:hover {
    text-decoration: underline;
  }
`;

const CarouselImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const SingleImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
`;

const ProductCardWrapper = styled(ProductCard)`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const StyledText = styled(Text)`
  font-family: "Merriweather", serif;
  font-weight: bold;
  font-size: 16px;
`;

const DescriptionText = styled(Text)`
  font-family: "Merriweather", serif;
  font-size: 14px;
`;

const NotificationContainer = styled.div`
  position: absolute;
  top: 10px;
  right: 5px;
  left: 5px;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  visibility: ${(props) => (props.show ? "visible" : "hidden")};
  opacity: ${(props) => (props.show ? 0.7 : 0)};
  transition: visibility 0s, opacity 0.5s linear;
`;


const ProductInfoCard = ({ product = {}, currency = {}, isDetail = false }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { addToCart } = useContext(CartContext);
  const { currency: contextCurrency } = useContext(ProductsContext);

  currency = Object.keys(currency).length === 0 ? contextCurrency : currency;

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

  const [amountInOtherCurrency, setAmountInOtherCurrency] = useState(0);
  const [isNotificationVisible, setIsNotificationVisible] = useState(false);

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
    addToCart(product);
    setIsNotificationVisible(true);
    setTimeout(() => setIsNotificationVisible(false), 3000);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    adaptiveHeight: true,
  };

  return (
    <>
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
            <SingleImage src={imageUrl} alt={name} />
          )}
          <Favourite product={product} />
        </ImageContainer>
        <ProductDetails>
          <StyledText>{name}</StyledText>
          <Spacer position="top" size="small">
            <DescriptionText>{description}</DescriptionText>
          </Spacer>
          <PriceContainer>{`${amountInOtherCurrency.toFixed(
            2
          )} ${currencySymbol}`}</PriceContainer>
          <Section>
            <Rating>
              {Array.from({ length: Math.floor(stars) }).map((_, i) => (
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
          <AddToCartButton onClick={handleAddToCart}>
            Add to Cart
          </AddToCartButton>
        </ProductDetails>
      </ProductCardWrapper>
      <NotificationContainer show={isNotificationVisible}>
      {name} added to cart!
      </NotificationContainer>
    </>
  );
};

export default ProductInfoCard;
