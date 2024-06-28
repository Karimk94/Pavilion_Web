import React from "react";
import styled from "styled-components";
import { Card } from "@mui/material";
import { CompactShopInfo } from "../shop/compact-shop-info.component";
import { Spacer } from "../spacer/spacer.component";
import { Text } from "../typography/text.component";

const FavouritesWrapper = styled(Card)`
  padding: 10px;
  z-index: 1;
  border-radius: 15px;
`;

const ScrollContainer = styled.div`
  display: flex;
  overflow-x: auto;
  white-space: nowrap;
  padding: 10px 0;
`;

const TouchableWrapper = styled.div`
  cursor: pointer;
  display: inline-block;
`;

export const FavouritesBar = ({ favourites, onNavigate }) => {
  if (!favourites.length) {
    return null;
  }

  return (
    <FavouritesWrapper elevation={3}>
      <Spacer variant="left.large">
        <Text variant="caption">Favourites</Text>
      </Spacer>
      <ScrollContainer>
        {favourites.map((shop) => {
          const key = shop.name;
          return (
            <Spacer key={key} position="left" size="medium">
              <TouchableWrapper
                onClick={() =>
                  onNavigate("ShopDetail", {
                    shop,
                  })
                }
              >
                <CompactShopInfo shop={shop} />
              </TouchableWrapper>
            </Spacer>
          );
        })}
      </ScrollContainer>
    </FavouritesWrapper>
  );
};
