import React, { useContext } from "react";
import styled from "styled-components";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { FavouritesContext } from "../../../services/favourites/favourites.context";
import { ShopInfoCard } from "../../shops/components/shop-info-card.component";
import { ShopList } from "../../shops/components/shop-list.styles";

const NoFavouritesArea = styled(SafeArea)`
  align-items: center;
  justify-content: center;
`;

const FavouritesContainer = styled.div`
  padding: 16px;
`;

const FavouriteItem = styled.div`
  cursor: pointer;
`;

export const FavouritesScreen = ({ navigation }) => {
  const { favourites } = useContext(FavouritesContext);

  return favourites.length ? (
    <SafeArea>
      <ShopList
        data={favourites}
        renderItem={({ item }) => {
          return (
            <FavouriteItem
              onClick={() =>
                navigation.navigate("ShopDetail", {
                  shop: item,
                })
              }
            >
              <Spacer position="bottom" size="large">
                <ShopInfoCard shop={item} />
              </Spacer>
            </FavouriteItem>
          );
        }}
        keyExtractor={(item) => item.name}
      />
    </SafeArea>
  ) : (
    <NoFavouritesArea>
      <Text center>No favourites yet</Text>
    </NoFavouritesArea>
  );
};
