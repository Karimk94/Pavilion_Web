import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { LocationContext } from "../../../services/location/location.context";

const SearchContainer = styled.div`
  padding: ${(props) => props.theme.space[3]};
  position: absolute;
  z-index: 1;
  top: 40px;
  width: 100%;
`;

export const Search = () => {
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
          if (e.key === 'Enter') {
            search(searchKeyword);
          }
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        fullWidth
      />
    </SearchContainer>
  );
};
