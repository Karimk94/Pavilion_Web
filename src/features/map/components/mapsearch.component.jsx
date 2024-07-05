import SearchIcon from "@mui/icons-material/Search";
import { InputAdornment, TextField } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { LocationContext } from "../../../services/location/location.context";

const SearchBar = styled(TextField)`
  padding: ${(props) => props.theme.space[0]};
  margin: ${(props) => props.theme.space[2]};
  background-color: ${(props) => props.theme.colors.bg.primary};
  width: calc(100% - ${(props) => props.theme.space[4]});
`;

const SearchContainer = styled.div`
  z-index: 1;
  position: absolute;
  top: 65px;
  width: 100%;
`;

export const SearchMap = () => {
  const { keyword, search } = useContext(LocationContext);
  const [searchQuery, setSearchQuery] = useState(keyword);

  useEffect(() => {
    setSearchQuery(keyword);
  }, [keyword]);

  return (
    <SearchContainer>
      <SearchBar
        variant="outlined"
        placeholder="Search for location"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            search(searchQuery);
          }
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    </SearchContainer>
  );
};
