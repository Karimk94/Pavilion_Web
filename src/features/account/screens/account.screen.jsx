import React from "react";
import Lottie from "react-lottie";
import { ThemeProvider } from "styled-components";
import { Button, Typography } from "@mui/material";
import styled from "styled-components";
import { Spacer } from "../../../components/spacer/spacer.component";
import { colors } from "../../../infrastructure/theme/colors";
import animationData from "../../../../assets/watermelon.json";
import { AccountBackground, AccountContainer, AccountCover, AnimationWrapper, AuthButton, Title } from "../components/account.styles";

// Styled Button for web
const WebAuthButton = styled(Button)`
  && {
    background-color: ${colors.brand.primary};
    color: white;
    padding: ${(props) => props.theme.space[2]};
  }
`;

export const AccountScreen = ({ navigation }) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <AccountBackground>
        <AccountCover />
        <AnimationWrapper>
          <Lottie options={defaultOptions} height="100%" width="100%" />
        </AnimationWrapper>
        <Title>Pavilion</Title>
        <AccountContainer>
          <WebAuthButton
            startIcon={<i className="material-icons">lock_open</i>}
            variant="contained"
            onClick={() => navigation.navigate("Login")}
          >
            Login
          </WebAuthButton>
          <Spacer size="large">
            <WebAuthButton
              startIcon={<i className="material-icons">email</i>}
              variant="contained"
              onClick={() => navigation.navigate("Register")}
            >
              Register
            </WebAuthButton>
          </Spacer>
        </AccountContainer>
      </AccountBackground>
    </ThemeProvider>
  );
};
