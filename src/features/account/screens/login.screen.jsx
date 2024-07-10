import { Button, IconButton, TextField, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { FaChevronLeft } from "react-icons/fa6";
import { TailSpin } from "react-loader-spinner";
import styled from "styled-components";
import { Spacer } from "../../../components/spacer/spacer.component";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import {
  AccountBackground,
  AccountContainer,
  AccountCover,
  ErrorContainer,
} from "../components/account.styles";
import { colors } from "../../../infrastructure/theme/colors";

const WebAuthButton = styled(Button)`
  && {
    background-color: ${(props) => props.theme.colors.brand.primary};
    color: white;
    padding: ${(props) => props.theme.space[2]};
  }
`;

const AuthInput = styled(TextField)`
  && {
    width: 100%;
    max-width: 300px;
  }
`;

const BackButton = styled(IconButton)`
  && {
    position: absolute;
    top: 10px;
    left: 10px;
    color: ${(props) => props.theme.colors.brand.primary};
  }
`;

const LoginScreen = ({ setView }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { onLogin, errors, isLoading } = useContext(AuthenticationContext);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      onLogin(email, password);
    }
  };

  return (
    <AccountBackground>
      <AccountCover />
      <BackButton onClick={() => setView("default")}>
        <FaChevronLeft />
      </BackButton>
      <AccountContainer onKeyPress={handleKeyPress}>
        <AuthInput
          label="E-mail"
          value={email}
          type="email"
          autoComplete="email"
          variant="outlined"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Spacer size="large">
          <AuthInput
            label="Password"
            value={password}
            type="password"
            autoComplete="current-password"
            variant="outlined"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Spacer>
        {errors?.length > 0 && (
          <ErrorContainer size="large">
            {errors.map((error) => (
              <Typography variant="body2" color="error">
                {error}
              </Typography>
            ))}
          </ErrorContainer>
        )}
        <Spacer size="large">
          {!isLoading ? (
            <WebAuthButton
              variant="contained"
              onClick={() => onLogin(email, password)}
            >
              Login
            </WebAuthButton>
          ) : (
            <TailSpin
              height="50"
              width="50"
              color={colors.brand.primary}
              ariaLabel="loading"
            />
          )}
        </Spacer>
      </AccountContainer>
    </AccountBackground>
  );
};

export default LoginScreen;
