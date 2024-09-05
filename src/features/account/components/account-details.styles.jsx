// account-details.styles.js

import { Avatar, Button, TextField, Typography, MenuItem } from "@mui/material";
import styled from "styled-components";
import { CameraAlt } from "@mui/icons-material";

export const AccountDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
`;

export const Section = styled.div`
  width: 100%;
  max-width: 600px;
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
`;

export const SectionTitle = styled(Typography).attrs({ variant: "h6" })`
  margin-bottom: 1rem;
  font-weight: bold;
  color: ${(props) => props.theme.colors.text.primary};
`;

export const FieldRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1rem;
`;

export const StyledTextField = styled(TextField)`
  && {
    flex: 1;
    min-width: 250px;

    // Override the default input text color
    .MuiInputBase-input {
      color: ${(props) => props.theme.colors.text.primary};
      \ &:autofill {
        -webkit-box-shadow: 0 0 0 100px
          ${(props) => props.theme.colors.bg.primary} inset;
        -webkit-text-fill-color: ${(props) =>
          props.theme.colors.text.primary} !important;
      }
    }

    // Override the label text color
    .MuiInputLabel-root {
      color: ${(props) => props.theme.colors.text.primary};
    }

    // Override the focused label text color
    .Mui-focused {
      color: ${(props) => props.theme.colors.text.primary};
    }

    // Override the disabled input text color with increased specificity
    && .MuiInputBase-input.Mui-disabled {
      color: ${(props) => props.theme.colors.text.disabled};
      -webkit-text-fill-color: ${(props) => props.theme.colors.text.disabled};
    }
  }
`;

export const SaveButton = styled(Button)`
  && {
    background-color: ${(props) => props.theme.colors.brand.primary};
    color: ${(props) => props.theme.colors.text.inverse};
    margin-top: 1rem;
  }
`;

export const HiddenInput = styled.input`
  display: none;
`;

export const AvatarContainer = styled.div`
  position: relative;
  cursor: pointer;
  &:hover .camera-icon {
    opacity: 0.7;
  }
`;

export const StyledAvatar = styled(Avatar)`
  width: 100px !important;
  height: 100px !important;
  background-color: ${(props) => props.theme.colors.brand.primary};
`;

export const CameraIcon = styled(CameraAlt)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0;
  transition: opacity 0.3s ease;
  color: ${(props) => props.theme.colors.text.inverse};
  font-size: 48px;
  pointer-events: none;
`;

export const StyledMenuItem = styled(MenuItem)`
  && {
    color: ${(props) => props.theme.colors.text.primary};
    background-color: ${(props) => props.theme.colors.bg.primary};

    &:hover {
      background-color: ${(props) => props.theme.colors.bg.secondary};
      color: ${(props) => props.theme.colors.text.secondary};
    }
  }
`;
