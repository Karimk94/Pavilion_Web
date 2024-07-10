import React, { useContext, useState, useEffect } from "react";
import { Avatar, Button, MenuItem, TextField, Typography } from "@mui/material";
import { TailSpin } from "react-loader-spinner";
import styled from "styled-components";
import { Spacer } from "../../../components/spacer/spacer.component";
import { colors } from "../../../infrastructure/theme/colors";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import { pascalToCamel } from "../../../utils/array-transform";
import fetchHttp from "../../../utils/fetchHttp";

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

const HiddenInput = styled.input`
  display: none;
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
    photoUrl: "",
  });
  const [countries, setCountries] = useState([]);
  const [isCountriesLoading, setIsCountriesLoading] = useState(false);
  const [tempPhoto, setTempPhoto] = useState("");

  const countriesTransform = (results = []) => {
    return pascalToCamel(results);
  };

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
        photoUrl: user.photoUrl || "users/default.jpg",
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

  const handleSave = async () => {
    const detailsToSave = {
      ...userDetails,
      photoUrl: tempPhoto || userDetails.photoUrl,
    };
    console.log("Saved user details:", detailsToSave);

    // Save the updated user details to the backend
    try {
      const response = await fetchHttp("/user/save", {
        method: "POST",
        body: JSON.stringify(detailsToSave),
      });
      if (response.success) {
        console.log("User details saved successfully.");
      } else {
        console.error("Failed to save user details:", response.error);
      }
    } catch (error) {
      console.error("Error saving user details:", error);
    }
  };

  const handleCountryFocus = async () => {
    if (countries.length === 0) {
      setIsCountriesLoading(true);
      try {
        const response = await fetchHttp("Country/getcountries");
        const transformedCountries = countriesTransform(response.data);
        setCountries(transformedCountries);
      } catch (error) {
        console.error("Failed to fetch countries:", error);
      } finally {
        setIsCountriesLoading(false);
      }
    }
  };

  const handlePhotoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTempPhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <AccountDetailsContainer>
      <label htmlFor="photo-upload">
        <Avatar
          alt="User Avatar"
          src={tempPhoto || `/images/${userDetails.photoUrl}`}
          sx={{
            width: 100,
            height: 100,
            bgcolor: colors.brand.primary,
            cursor: "pointer",
          }}
        />
      </label>
      <HiddenInput
        id="photo-upload"
        type="file"
        accept="image/*"
        onChange={handlePhotoUpload}
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
            onFocus={handleCountryFocus}
            InputProps={{
              endAdornment: isCountriesLoading && (
                <TailSpin
                  height="50"
                  width="50"
                  color={colors.brand.primary}
                  ariaLabel="loading"
                />
              ),
            }}
          >
            {countries.map((country) => (
              <MenuItem key={country.code} value={country.name}>
                {country.name}
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
