import { CardContent, CardMedia, Card as MuiCard } from "@mui/material";
import { Svg } from "react-svg";
import styled from "styled-components";
import open from "../../../../assets/open.svg";
import star from "../../../../assets/star.svg";
import { Favourite } from "../../../components/favourite/favourite.component";
import { Text } from "../../../components/typography/text.component";
import {
  Info,
  Rating,
  Section,
  SectionEnd,
} from "./shopInfoCardStyles";

const StyledSvg = styled(Svg)`
  width: 20px;
  height: 20px;
`;

const StyledMuiCard = styled(MuiCard)`
  background-color: ${(props) => props.theme.colors.bg.primary};
  width: 95%;
  margin: 0 auto;
`;

const StyledMuiCardMedia = styled(CardMedia)`
  padding: ${(props) => props.theme.space[3]};
  background-color: ${(props) => props.theme.colors.bg.primary};
  height: 200px;
`;

const StyledMuiCardContent = styled(CardContent)`
  padding: ${(props) => props.theme.space[3]};
`;

const ShopInfo = ({ shop = {}, onPressIcon }) => {
  const { name, location, id, imageUrl, closed_bucket } = shop;

  const ratingArr = Array.isArray(imageUrl) && imageUrl.length !== 0
    ? Array.from(new Array(Math.floor(imageUrl.length / 3)))
    : [];

  return (
    <StyledMuiCard elevation={5}>
      <div>
        <Favourite shop={shop} onPress={onPressIcon} />
        <StyledMuiCardMedia
          image={
            Array.isArray(imageUrl) && imageUrl.length > 0
              ? imageUrl[0]
              : "https://www.foodiesfeed.com/wp-content/uploads/2019/06/top-view-for-box-of-2-burgers-home-made-600x899.jpg"
          }
          title={name}
        />
      </div>
      <StyledMuiCardContent>
        <Info>
          <Text variant="label">{name}</Text>
          <Section>
            <Rating>
              {ratingArr.map((_, index) => (
                <StyledSvg key={`star-${id}-${index}`} src={star} />
              ))}
            </Rating>
            <SectionEnd>
              {closed_bucket !== "VeryLikelyOpen" && (
                <Text variant="error">CLOSED TEMPORARILY</Text>
              )}
              {closed_bucket === "VeryLikelyOpen" && (
                <StyledSvg src={open} />
              )}
            </SectionEnd>
          </Section>
          <Text variant="label">{location}</Text>
        </Info>
      </StyledMuiCardContent>
    </StyledMuiCard>
  );
};

export default ShopInfo;
