import React, { useContext, useState } from "react";
import { CircularProgress, TextField, Button, Typography } from "@mui/material";
import styled from "styled-components";
import { Spacer } from "../../../components/spacer/spacer.component";
import { colors } from "../../../infrastructure/theme/colors";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import { AccountBackground, AccountContainer, AccountCover, AuthButton, Title, ErrorContainer } from "../components/account.styles";

// Styled Button for web
const WebAuthButton = styled(Button)`
  && {
    background-color: ${(props) => props.theme.colors.brand.primary};
    color: white;
    padding: ${(props) => props.theme.space[2]};
  }
`;

// Styled TextField for web
const AuthInput = styled(TextField)`
  && {
    width: 100%;
    max-width: 300px;
  }
`;

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { onLogin, error, isLoading } = useContext(AuthenticationContext);

  return (
    <AccountBackground>
      <AccountCover />
      <Title>Pavilion</Title>
      <AccountContainer>
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
        {error && (
          <ErrorContainer size="large">
            <Typography variant="body2" color="error">
              {error}
            </Typography>
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
            <CircularProgress color="primary" />
          )}
        </Spacer>
      </AccountContainer>
      <Spacer size="large">
        <WebAuthButton variant="contained" onClick={() => navigation.goBack()}>
          Back
        </WebAuthButton>
      </Spacer>
    </AccountBackground>
  );
};

export default LoginScreen;
