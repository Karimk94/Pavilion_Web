import styled from "styled-components";
import { CircularProgress, Avatar, Button, TextField } from "@mui/material";
import { colors } from "../../../infrastructure/theme/colors";

export const CartIconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

export const PaymentProcessing = styled(CircularProgress).attrs({
  size: 128,
  color: "primary",
})`
  position: absolute;
  top: 50%;
  left: 35%;
  z-index: 1;
`;

export const CartIcon = styled(Avatar)`
  width: 128px;
  height: 128px;
  background-color: ${(props) => props.bg || props.theme.colors.brand.primary};
`;

export const NameInput = styled(TextField)`
  margin: ${(props) => props.theme.space[3]};
  width: 100%;
`;

export const PayButton = styled(Button).attrs({
  variant: "contained",
  color: "primary",
})`
  width: 80%;
  margin: ${(props) => props.theme.space[2]} auto;
  padding: ${(props) => props.theme.space[2]};
`;

export const ClearButton = styled(Button).attrs({
  variant: "contained",
  color: "error",
})`
  width: 80%;
  margin: ${(props) => props.theme.space[2]} auto;
  padding: ${(props) => props.theme.space[2]};
`;
