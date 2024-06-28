import styled from "styled-components";
import { Button } from "@mui/material";
import { colors } from "../../../infrastructure/theme/colors";

export const ProductList = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
  gap: 16px; /* Add gap between items */
`;

export const OrderButton = styled(Button)`
  && {
    background-color: ${colors.brand.primary};
    color: white;
    padding: ${(props) => props.theme.space[2]};
    width: 80%;
    align-self: center;
  }

  &:hover {
    background-color: ${colors.brand.primaryDark};
  }
`;
