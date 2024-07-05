import { Button } from "@mui/material";
import { useState } from "react";
import { FaEnvelope, FaLockOpen } from "react-icons/fa";
import styled, { ThemeProvider } from "styled-components";
import { Spacer } from "../../../components/spacer/spacer.component";
import { colors } from "../../../infrastructure/theme/colors";
import {
  AccountBackground,
  AccountContainer,
  AccountCover,
} from "../components/account.styles";
import LoginScreen from "./login.screen";
import RegisterScreen from "./register.screen";

// Styled Button for web
const WebAuthButton = styled(Button)`
  && {
    background-color: ${colors.brand.primary};
    color: white;
    padding: ${(props) => props.theme.space[2]};
    width: 150px
  }
`;

const theme = {
  space: ["0px", "4px", "8px", "16px", "32px", "64px"],
  colors: {
    brand: {
      primary: "#2182BD",
    },
  },
};

export const AccountScreen = () => {
  const [currentView, setCurrentView] = useState("default");

  return (
    <ThemeProvider theme={theme}>
      <AccountBackground>
        <AccountCover />
        {currentView === "default" && (
          <AccountContainer>
            <WebAuthButton
              startIcon={<FaLockOpen />}
              variant="contained"
              onClick={() => setCurrentView("login")}
            >
              Login
            </WebAuthButton>
            <Spacer size="large">
              <WebAuthButton
                startIcon={<FaEnvelope />}
                variant="contained"
                onClick={() => setCurrentView("register")}
              >
                Register
              </WebAuthButton>
            </Spacer>
          </AccountContainer>
        )}
        {currentView === "login" && <LoginScreen setView={setCurrentView} />}
        {currentView === "register" && (
          <RegisterScreen setView={setCurrentView} />
        )}
      </AccountBackground>
    </ThemeProvider>
  );
};
