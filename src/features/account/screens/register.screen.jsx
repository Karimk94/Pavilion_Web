import React, { useContext, useState } from "react";
import { CircularProgress, Button, TextField, Typography } from "@mui/material";
import styled from "styled-components";
import { Spacer } from "../../../components/spacer/spacer.component";
import { colors } from "../../../infrastructure/theme/colors";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import { AccountBackground, AccountContainer, AccountCover, ErrorContainer, Title } from "../components/account.styles";

const AuthButton = styled(Button)`
  && {
    background-color: ${colors.brand.primary};
    color: white;
  }
`;

const AuthInput = styled(TextField)`
  && {
    width: 100%;
  }
`;

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState("");
  const { onRegister, isLoading, error } = useContext(AuthenticationContext);

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
        <Spacer size="large">
          <AuthInput
            label="Repeat Password"
            value={repeatedPassword}
            type="password"
            autoComplete="current-password"
            variant="outlined"
            onChange={(e) => setRepeatedPassword(e.target.value)}
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
            <AuthButton
              variant="contained"
              onClick={() => onRegister(email, password, repeatedPassword)}
            >
              Register
            </AuthButton>
          ) : (
            <CircularProgress color="primary" />
          )}
        </Spacer>
      </AccountContainer>
      <Spacer size="large">
        <AuthButton variant="contained" onClick={() => navigation.goBack()}>
          Back
        </AuthButton>
      </Spacer>
    </AccountBackground>
  );
};

export default RegisterScreen;
