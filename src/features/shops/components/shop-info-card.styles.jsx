import styled from "styled-components";
import { Card as MuiCard, CardMedia as MuiCardMedia } from "@mui/material";

export const Icon = styled.img`
  width: 15px;
  height: 15px;
`;

export const ShopCard = styled(MuiCard)`
  background-color: ${(props) => props.theme.colors.bg.primary};
  width: 95%;
  margin: 0 auto;
`;

export const ShopCardCover = styled(MuiCardMedia)`
  padding: ${(props) => props.theme.space[3]};
  background-color: ${(props) => props.theme.colors.bg.primary};
  height: 200px; /* Adjust the height as needed */
`;

export const Address = styled.p`
  font-family: ${(props) => props.theme.fonts.body};
  font-size: ${(props) => props.theme.fontSizes.caption};
`;

export const Info = styled.div`
  padding: ${(props) => props.theme.space[3]};
`;

export const Rating = styled.div`
  display: flex;
  flex-direction: row;
  padding-top: ${(props) => props.theme.space[2]};
  padding-bottom: ${(props) => props.theme.space[2]};
`;

export const Section = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const SectionEnd = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: flex-end;
`;
