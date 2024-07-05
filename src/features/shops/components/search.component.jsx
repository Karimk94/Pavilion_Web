import FavoriteIcon from "@mui/icons-material/Favorite";
import SearchIcon from "@mui/icons-material/Search";
import { InputAdornment, TextField } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";

import { LocationContext } from "../../../services/location/location.context";

const SearchContainer = styled.div`
  padding: ${(props) => props.theme.space[3]};
`;

export const Search = ({ isFavouritesToggled, onFavouritesToggle }) => {
  const { keyword, search } = useContext(LocationContext);
  const [searchKeyword, setSearchKeyword] = useState(keyword);

  useEffect(() => {
    setSearchKeyword(keyword);
  }, [keyword]);

  return (
    <SearchContainer>
      <TextField
        variant="outlined"
        placeholder="Search for a location"
        value={searchKeyword}
        onChange={(e) => setSearchKeyword(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            search(searchKeyword);
          }
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <FavoriteIcon
                color={isFavouritesToggled ? "error" : "disabled"}
                onClick={onFavouritesToggle}
                style={{ cursor: "pointer" }}
              />
            </InputAdornment>
          ),
        }}
        fullWidth
      />
    </SearchContainer>
  );
};
