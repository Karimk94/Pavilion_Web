import { useState } from "react";
import { FaEnvelope, FaLockOpen } from "react-icons/fa";
import { Spacer } from "../../../components/spacer/spacer.component";
import {
  AccountBackground,
  AccountContainer,
  AccountCover,
  RegisterButton,
  LoginButton,
} from "../components/account.styles";
import LoginScreen from "./login.screen";
import RegisterScreen from "./register.screen";

export const AccountScreen = () => {
  const [currentView, setCurrentView] = useState("default");

  return (
    <AccountBackground>
      <AccountCover />
      {currentView === "default" && (
        <AccountContainer>
          <LoginButton
            startIcon={<FaLockOpen />}
            variant="contained"
            onClick={() => setCurrentView("login")}
          >
            Login
          </LoginButton>
          <Spacer size="large">
            <RegisterButton
              startIcon={<FaEnvelope />}
              variant="contained"
              onClick={() => setCurrentView("register")}
            >
              Register
            </RegisterButton>
          </Spacer>
        </AccountContainer>
      )}
      {currentView === "login" && <LoginScreen setView={setCurrentView} />}
      {currentView === "register" && (
        <RegisterScreen setView={setCurrentView} />
      )}
    </AccountBackground>
  );
};
