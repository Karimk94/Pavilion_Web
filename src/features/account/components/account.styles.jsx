import styled from "styled-components";
import { Button, TextField, Typography } from "@mui/material";
import { colors } from "../../../infrastructure/theme/colors";
import homeBg from "../../../../assets/home_bg.jpg";

export const AccountBackground = styled.div`
  background-image: url(${homeBg});
  background-size: cover;
  background-position: center;
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
`;

export const AccountCover = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.3);
`;

export const AccountContainer = styled.div`
  background-color: rgba(255, 255, 255, 0.7);
  padding: ${(props) => props.theme.space[4]};
  margin-top: ${(props) => props.theme.space[2]};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const AuthButton = styled(Button)`
  && {
    background-color: ${colors.brand.primary};
    padding: ${(props) => props.theme.space[2]};
    color: white;
  }
`;

export const AuthInput = styled(TextField)`
  width: 300px;
`;

export const Title = styled(Typography).attrs({
  variant: "h4",
})`
  font-size: 30px;
`;

export const ErrorContainer = styled.div`
  max-width: 300px;
  display: flex;
  align-items: center;
  align-self: center;
  margin-top: ${(props) => props.theme.space[2]};
  margin-bottom: ${(props) => props.theme.space[2]};
`;

export const AnimationWrapper = styled.div`
  width: 100%;
  height: 40%;
  position: absolute;
  top: 30px;
  padding: ${(props) => props.theme.space[2]};
`;
