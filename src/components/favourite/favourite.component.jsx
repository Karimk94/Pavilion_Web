import React, { useContext } from "react";
import styled from "styled-components";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { FavouritesContext } from "../../services/favourites/favourites.context";

const FavouriteButton = styled.button`
  top: 25px;
  right: 25px;
  z-index: 1;
  background: none;
  border: none;
  cursor: pointer;
`;

export const Favourite = ({ product }) => {
  const { favourites, addToFavourites, removeFromFavourites } =
    useContext(FavouritesContext);

  const isFavourite = favourites?.find((r) => r.id === product.id) ?? false;

  return (
    <FavouriteButton
      onClick={() =>
        !isFavourite
          ? addToFavourites(product)
          : removeFromFavourites(product)
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