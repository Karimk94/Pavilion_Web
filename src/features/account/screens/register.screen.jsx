import { Button, TextField, Typography, IconButton } from "@mui/material";
import { TailSpin } from "react-loader-spinner";

import { useContext, useState } from "react";
import styled from "styled-components";
import { Spacer } from "../../../components/spacer/spacer.component";
import { colors } from "../../../infrastructure/theme/colors";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import { FaChevronLeft } from "react-icons/fa6";
import {
  AccountBackground,
  AccountContainer,
  AccountCover,
  ErrorContainer,
} from "../components/account.styles";

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

const BackButton = styled(IconButton)`
  && {
    position: absolute;
    top: 10px;
    left: 10px;
    color: ${colors.brand.primary};
  }
`;

const RegisterScreen = ({ setView }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState("");
  const [passwordErrors, setPasswordErrors] = useState([]);
  const { onRegister, isLoading, errors } = useContext(AuthenticationContext);

  const validatePassword = (value) => {
    setPassword(value);
    const pwdErrors = [];
    if (!/(?=.*[a-z])/.test(value)) {
      pwdErrors.push("At least one lowercase letter");
    }
    if (!/(?=.*[A-Z])/.test(value)) {
      pwdErrors.push("At least one uppercase letter");
    }
    if (!/(?=.*[0-9])/.test(value)) {
      pwdErrors.push("At least one digit");
    }
    if (!/(?=.*[!@#\\$%\\^&\\*])/.test(value)) {
      pwdErrors.push("At least one special character");
    }
    if (!/.{8,}/.test(value)) {
      pwdErrors.push("Minimum 8 characters");
    }
    setPasswordErrors(pwdErrors);
  };

  const validateRepeatedPassword = (value) => {
    setRepeatedPassword(value);
  };

  const isFormValid = () => {
    return password === repeatedPassword && passwordErrors.length === 0;
  };

  const register = () => {
    if (isFormValid()) {
      onRegister(email, password);
    }
  };

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
            onChange={(e) => validatePassword(e.target.value)}
            error={passwordErrors.length > 0}
            helperText={
              passwordErrors.length > 0 ? (
                <ul>
                  {passwordErrors.map((err, index) => (
                    <li key={index}>{err}</li>
                  ))}
                </ul>
              ) : null
            }
          />
        </Spacer>
        <Spacer size="large">
          <AuthInput
            label="Repeat Password"
            value={repeatedPassword}
            type="password"
            autoComplete="current-password"
            variant="outlined"
            onChange={(e) => validateRepeatedPassword(e.target.value)}
            error={repeatedPassword && password !== repeatedPassword}
            helperText={
              repeatedPassword && password !== repeatedPassword
                ? "Passwords do not match"
                : null
            }
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
            <AuthButton
              variant="contained"
              onClick={register}
              disabled={!isFormValid()}
            >
              Register
            </AuthButton>
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

export default RegisterScreen;
