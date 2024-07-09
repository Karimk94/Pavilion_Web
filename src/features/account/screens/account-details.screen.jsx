import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { Avatar, Button, MenuItem, TextField, Typography } from "@mui/material";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import { Spacer } from "../../../components/spacer/spacer.component";
import { colors } from "../../../infrastructure/theme/colors";

const AccountDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
`;

const Section = styled.div`
  width: 100%;
  max-width: 600px;
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
`;

const SectionTitle = styled(Typography).attrs({ variant: "h6" })`
  margin-bottom: 1rem;
  font-weight: bold;
`;

const FieldRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const StyledTextField = styled(TextField)`
  && {
    flex: 1;
    min-width: 250px;
  }
`;

const SaveButton = styled(Button)`
  && {
    background-color: ${colors.brand.primary};
    color: white;
    margin-top: 1rem;
  }
`;

const AccountDetails = () => {
  const { user } = useContext(AuthenticationContext);
  const [userDetails, setUserDetails] = useState({
    nickname: "",
    phoneNumber: "",
    userType: "customer", // Default user type
    dateOfBirth: "",
    address1: "",
    address2: "",
    country: "",
    city: "",
    state: "",
    poBox: "",
    photoURL: "",
  });

  const countries = ["USA", "Canada", "UK"]; // Example country list

  useEffect(() => {
    if (user) {
      setUserDetails({
        nickname: user.nickname || "",
        phoneNumber: user.phoneNumber || "",
        userType: user.userType || "customer",
        dateOfBirth: user.dateOfBirth || "",
        address1: user.address1 || "",
        address2: user.address2 || "",
        country: user.country || "",
        city: user.city || "",
        state: user.state || "",
        poBox: user.poBox || "",
        photoURL: user.photoURL || "images/users/default.jpg",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSave = () => {
    // Save the updated user details to the backend
    console.log("Saved user details:", userDetails);
  };

  return (
    <AccountDetailsContainer>
      <Avatar
        alt="User Avatar"
        src={userDetails.photoURL}
        sx={{ width: 100, height: 100, bgcolor: colors.brand.primary }}
      />
      <Spacer position="top" size="large">
        <Typography variant="h5">{user?.email}</Typography>
      </Spacer>
      <Section>
        <SectionTitle>Personal Information</SectionTitle>
        <FieldRow>
          <StyledTextField
            label="Nickname"
            name="nickname"
            value={userDetails.nickname}
            onChange={handleChange}
            variant="outlined"
          />
          <StyledTextField
            label="Phone Number"
            name="phoneNumber"
            value={userDetails.phoneNumber}
            onChange={handleChange}
            variant="outlined"
          />
        </FieldRow>
        <FieldRow>
          <StyledTextField
            label="User Type"
            name="userType"
            value={userDetails.userType}
            onChange={handleChange}
            variant="outlined"
            disabled
          />
          <StyledTextField
            label="Date of Birth"
            name="dateOfBirth"
            type="date"
            value={userDetails.dateOfBirth}
            onChange={handleChange}
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </FieldRow>
      </Section>
      <Section>
        <SectionTitle>Address Information</SectionTitle>
        <FieldRow>
          <StyledTextField
            label="Address 1"
            name="address1"
            value={userDetails.address1}
            onChange={handleChange}
            variant="outlined"
          />
          <StyledTextField
            label="Address 2"
            name="address2"
            value={userDetails.address2}
            onChange={handleChange}
            variant="outlined"
          />
        </FieldRow>
        <FieldRow>
          <StyledTextField
            label="City"
            name="city"
            value={userDetails.city}
            onChange={handleChange}
            variant="outlined"
          />
          <StyledTextField
            label="State"
            name="state"
            value={userDetails.state}
            onChange={handleChange}
            variant="outlined"
          />
        </FieldRow>
        <FieldRow>
          <StyledTextField
            label="Country"
            name="country"
            value={userDetails.country}
            onChange={handleChange}
            variant="outlined"
            select
          >
            {countries.map((country) => (
              <MenuItem key={country} value={country}>
                {country}
              </MenuItem>
            ))}
          </StyledTextField>
          <StyledTextField
            label="PO Box"
            name="poBox"
            value={userDetails.poBox}
            onChange={handleChange}
            variant="outlined"
          />
        </FieldRow>
      </Section>
      <SaveButton variant="contained" onClick={handleSave}>
        Save
      </SaveButton>
    </AccountDetailsContainer>
  );
};

export default AccountDetails;
