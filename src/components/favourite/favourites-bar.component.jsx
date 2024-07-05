import { Card, Typography } from "@mui/material";
import styled from "styled-components";
import { CompactShopInfo } from "../shop/compact-shop-info.component";
import { Spacer } from "../spacer/spacer.component";

const FavouritesWrapper = styled(Card)`
  padding: 10px;
  z-index: 1;
  border-radius: 15px;
  margin-bottom: 4px;
`;

const ScrollContainer = styled.div`
  display: flex;
  overflow-x: auto;
  padding: 10px 0;
`;

const FavouriteButton = styled.div`
  cursor: pointer;
  display: inline-block;
`;

export const FavouritesBar = ({ favourites, onNavigate }) => {
  if (!favourites?.length) {
    return null;
  }
  return (
    <FavouritesWrapper elevation={3}>
      <Spacer variant="left.large">
        <Typography variant="caption">Favourites</Typography>
      </Spacer>
      <ScrollContainer>
        {favourites?.map((shop) => {
          const key = `f${shop.placeId} ${shop.name}`;
          return (
            <Spacer key={key} position="left" size="medium">
              <FavouriteButton
                onClick={() =>
                  onNavigate("ShopDetail", {
                    shop,
                  })
                }
              >
                <CompactShopInfo shop={shop} />
              </FavouriteButton>
            </Spacer>
          );
        })}
      </ScrollContainer>
    </FavouritesWrapper>
  );
};
