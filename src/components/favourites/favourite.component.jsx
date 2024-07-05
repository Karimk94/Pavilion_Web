import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { useContext } from "react";
import styled from "styled-components";
import { FavouritesContext } from "../../services/favourites/favourites.context";

const FavouriteButton = styled.button`
  top: 25px;
  right: 25px;
  z-index: 0;
  background: none;
  border: none;
  cursor: pointer;
`;

export const Favourite = ({ shop }) => {
  const { favourites, addToFavourites, removeFromFavourites } = useContext(
    FavouritesContext
  );

  const isFavourite = favourites.find((r) => r.placeId === shop.placeId);

  return (
    <FavouriteButton
      onClick={() =>
        !isFavourite
          ? addToFavourites(shop)
          : removeFromFavourites(shop)
      }
    >
      {isFavourite ? (
        <Favorite style={{ color: "red", fontSize: 24 }} />
      ) : (
        <FavoriteBorder style={{ color: "white", fontSize: 24 }} />
      )}
    </FavouriteButton>
  );
};
