import styled from "styled-components";
import { Card as MuiCard, CardMedia as MuiCardMedia } from "@mui/material";

export const ProductCard = styled(MuiCard)`
  background-color: ${(props) => props.theme.colors.bg.primary};
`;

export const Info = styled.div`
  padding: ${(props) => props.theme.space[1]};
`;

export const ProductCardCover = styled(MuiCardMedia)`
  padding: ${(props) => props.theme.space[2]};
  height: 0;
  padding-top: 56.25%; /* 16:9 aspect ratio */
`;

export const Section = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const Rating = styled.div`
  display: flex;
  flex-direction: row;
  padding-top: ${(props) => props.theme.space[1]};
  padding-bottom: ${(props) => props.theme.space[1]};
`;

export const SectionEnd = styled.div`
  display: flex;
  flex-direction: row;
  gap: ${(props) => props.theme.space[1]};
`;
