import { Search as SearchIcon } from "@mui/icons-material";
import { IconButton, TextField } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
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
  const [searchKeyword, setSearchKeyword] = useState(keyword);

  useEffect(() => {
    setSearchKeyword(keyword);
  }, [keyword]);

  const handleSearch = () => {
    setKeyword(searchKeyword);
    search(searchKeyword);
  };

  return (
    <SearchContainer>
      <CustomTextField
        variant="outlined"
        placeholder="Search for a Product, Shop, Category or Country"
        value={searchKeyword}
        onChange={(e) => setSearchKeyword(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            handleSearch();
          }
        }}
        InputProps={{
          endAdornment: (
            <IconButton onClick={handleSearch}>
              <SearchIcon />
            </IconButton>
          ),
        }}
      />
    </SearchContainer>
  );
};
