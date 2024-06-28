import {
  Favorite,
  FavoriteBorder,
  Search as SearchIcon,
} from "@mui/icons-material";
import { IconButton, TextField } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import { ProductsContext } from "../../../services/products/products.context.jsx";

const SearchContainer = styled.div`
  padding: ${(props) => props.theme.space[3]};
  display: flex;
  align-items: center;
`;

const CustomTextField = styled(TextField)`
  width: 100%;
  .MuiInputBase-root {
    font-size: ${(props) => props.theme.fontSizes.button};
  }
  .MuiInputBase-input::placeholder {
    color: ${(props) => props.theme.colors.placeholder};
  }
`;

export const Search = ({ isFavouritesToggled, onFavouritesToggle }) => {
  const { keyword, search, setKeyword } = useContext(ProductsContext);
  const { user } = useContext(AuthenticationContext);
  const [searchKeyword, setSearchKeyword] = useState(keyword);

  const onClear = () => setKeyword("");

  useEffect(() => {
    setSearchKeyword(keyword);
  }, [keyword]);

  return (
    <SearchContainer>
      {user && (
        <IconButton onClick={onFavouritesToggle}>
          {isFavouritesToggled ? <Favorite /> : <FavoriteBorder />}
        </IconButton>
      )}
      <CustomTextField
        variant="outlined"
        placeholder="Search for a Product, Shop, Category or Country"
        value={searchKeyword}
        onChange={(e) => setSearchKeyword(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            search(searchKeyword);
          }
        }}
        InputProps={{
          endAdornment: (
            <IconButton onClick={() => search(searchKeyword)}>
              <SearchIcon />
            </IconButton>
          ),
        }}
      />
    </SearchContainer>
  );
};
