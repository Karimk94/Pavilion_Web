import React from "react";
import { ReactSVG } from "react-svg";
import styled from "styled-components";
import open from "../../../../assets/open.js";
import star from "../../../../assets/star.js";
import { Favourite } from "../../../components/favourites/favourite.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";
import {
  Address,
  Icon,
  Info,
  Rating,
  ShopCard,
  ShopCardCover,
  Section,
  SectionEnd,
} from "./shop-info-card.styles";

// Styled components for web
const Card = styled.div`
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 16px;
`;

const CardCover = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const StyledIcon = styled.img`
  width: 20px;
  height: 20px;
`;

export const ShopInfoCard = ({ shop = {} }) => {
  const {
    name = "Some Shop",
    icon = "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/lodging-71.png",
    photos = [
      "https://www.foodiesfeed.com/wp-content/uploads/2019/06/top-view-for-box-of-2-burgers-home-made-600x899.jpg",
    ],
    address = "100 some random street",
    isOpenNow = true,
    rating = 4,
    isClosedTemporarily = true,
    placeId,
  } = shop;

  const ratingArray = Array.from(new Array(Math.floor(rating)));

  return (
    <Card>
      <div>
        <Favourite shop={shop} />
        <CardCover key={name} src={photos[0]} alt={name} />
      </div>
      <Info>
        <Text variant="label">{name}</Text>
        <Section>
          <Rating>
            {ratingArray.map((_, i) => (
              <ReactSVG key={`star-${placeId}-${i}`} src={star} width={20} height={20} />
            ))}
          </Rating>
          <SectionEnd>
            {isClosedTemporarily && (
              <Text variant="error">CLOSED TEMPORARILY</Text>
            )}
            <Spacer position="left" size="large">
              {isOpenNow && <ReactSVG src={open} width={20} height={20} />}
            </Spacer>
            <Spacer position="left" size="large">
              <StyledIcon src={icon} alt="icon" />
            </Spacer>
          </SectionEnd>
        </Section>
        <Address>{address}</Address>
      </Info>
    </Card>
  );
};
