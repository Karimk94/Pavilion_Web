import { CameraAlt, Upload } from "@mui/icons-material";
import { Menu, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { Spacer } from "../../../components/spacer/spacer.component";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { colors } from "../../../infrastructure/theme/colors";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import { pascalToCamel } from "../../../utils/array-transform";
import fetchHttp from "../../../utils/fetchHttp";
import { createRequestOptions } from "../../../utils/request-options";
import {
  AccountDetailsContainer,
  AvatarContainer,
  CameraIcon,
  FieldRow,
  HiddenInput,
  SaveButton,
  Section,
  SectionTitle,
  StyledAvatar,
  StyledTextField,
  StyledMenuItem,
} from "../components/account-details.styles";

const userRoles = [
  { Id: 3, Name: "Customer", visible: true },
  { Id: 2, Name: "Shop Owner", visible: true },
  { Id: 1, Name: "Admin", visible: false },
];

const isMobileDevice = () => {
  return /Mobi|Android/i.test(navigator.userAgent);
};

const AccountDetails = () => {
  const { user } = useContext(AuthenticationContext);
  const [userDetails, setUserDetails] = useState({
    userName: user?.userName || "",
    email: user?.email || "",
    mobile: user?.mobile || "",
    userRoleId: user?.userRoleId || 3,
    shopId: user?.shopId || "",
    photoUrl: user?.photoUrl || "users/default.jpg",
    address1: "",
    address2: "",
    country: "",
    city: "",
    state: "",
    poBox: "",
    countryId: null,
  });
  const [countries, setCountries] = useState([]);
  const [isCountriesLoading, setIsCountriesLoading] = useState(false);
  const [tempPhoto, setTempPhoto] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [shopName, setShopName] = useState("");

  const arrayTransform = (results = []) => {
    return pascalToCamel(results);
  };

  useEffect(() => {
    async function getUserDetails() {
      if (user) {
        const raw = { Id: user?.id };
        const requestOptions = createRequestOptions(raw, user?.token);

        const { response } = await fetchHttp(
          "User/getuserbyuserid",
          requestOptions
        );
        const transformedUser = arrayTransform(response);

        const mergedUserDetails = { ...user, ...transformedUser };

        // Set user details
        setUserDetails(mergedUserDetails);

        if (mergedUserDetails.countryId && countries.length > 0) {
          const country = countries.find(
            (country) => country.id === mergedUserDetails.countryId
          );
          if (country) {
            debugger;
          }
        }
      }
    }

    getUserDetails();
  }, [user, countries]);

  useEffect(() => {
    const fetchShopDetails = async () => {
      if (userDetails.shopId) {
        const requestOptions = createRequestOptions(
          { id: userDetails.shopId },
          user?.token
        );
        try {
          const { response } = await fetchHttp(
            "Shop/getshopbyid",
            requestOptions
          );

          if (response) {
            const transformedShop = arrayTransform(response);
            setShopName(transformedShop.name);
          }
        } catch (error) {
          console.error("Failed to fetch shop details:", error);
        }
      }
    };

    fetchShopDetails();
  }, [userDetails.shopId, user?.token]);

  useEffect(() => {
    const inputs = document.querySelectorAll("input");
    inputs.forEach((input) => {
      input.addEventListener("input", handleInputEvent);
    });

    return () => {
      inputs.forEach((input) => {
        input.removeEventListener("input", handleInputEvent);
      });
    };
  }, []);

  const handleInputEvent = (e) => {
    const { name, value } = e.target || e.currentTarget;
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target || e.currentTarget;
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    const userAddressDTO = {
      Id: userDetails.addressId || 0,
      Address1: userDetails.userAdresses?.[0]?.address1 || "",
      Address2: userDetails.userAdresses?.[0]?.address2 || "",
      City: userDetails.userAdresses?.[0]?.city || "",
      PostalCode: userDetails.userAdresses?.[0]?.postalCode || "",
      Phone: userDetails.mobile ? userDetails.mobile.toString() : "",
    };

    const detailsToSave = {
      Id: user?.id,
      ShopId: userDetails.shopId || 0,
      UserRoleId: userDetails.userRoleId,
      Email: userDetails.email,
      UserName: userDetails.userName || "",
      Name: userDetails.name || "",
      Mobile: userDetails.mobile ? parseInt(userDetails.mobile, 10) : null,
      PhotoUrl: tempPhoto || userDetails.photoUrl || "",
      UserAddressDTO: userAddressDTO,
    };

    try {
      const requestOptions = createRequestOptions(detailsToSave, user?.token);
      const response = await fetchHttp("User/saveuserdetails", requestOptions);
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
        const raw = { Columns: ["Name"] };
        const requestOptions = createRequestOptions(raw);
        const { response } = await fetchHttp(
          "Country/getcountries",
          requestOptions
        );
        const transformedCountries = arrayTransform(response?.Countries);
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
    setAnchorEl(null);
  };

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleUseCamera = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.capture = "camera";
    input.onchange = handlePhotoUpload;
    input.click();
    setAnchorEl(null);
  };

  const visibleRoles = userRoles.filter(
    (role) => role.visible || role.Id === userDetails.userRoleId
  );

  return (
    <SafeArea>
      <AccountDetailsContainer>
        <AvatarContainer onClick={handleOpenMenu}>
          <StyledAvatar
            alt="User Avatar"
            src={tempPhoto || `/images/${userDetails.photoUrl}`}
          />
          <CameraIcon className="camera-icon" />
        </AvatarContainer>
        <Menu
          id="photo-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleCloseMenu}
        >
          <StyledMenuItem
            onClick={() => document.getElementById("file-upload").click()}
          >
            <Upload />
            Upload Picture
          </StyledMenuItem>
          {isMobileDevice() && (
            <StyledMenuItem onClick={handleUseCamera}>
              <CameraAlt />
              Use Camera
            </StyledMenuItem>
          )}
        </Menu>
        <HiddenInput
          id="file-upload"
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
              name="userName"
              value={userDetails.userName || ""}
              onChange={handleChange}
              variant="outlined"
            />
            <StyledTextField
              label="Phone Number"
              name="mobile"
              value={userDetails.mobile || ""}
              onChange={handleChange}
              variant="outlined"
            />
          </FieldRow>
          <FieldRow>
            <StyledTextField
              label="User Type"
              name="userRoleId"
              value={userDetails.userRoleId || ""}
              onChange={handleChange}
              variant="outlined"
              select
              disabled={user?.userRoleId === 1}
            >
              {visibleRoles.map((role) => (
                <StyledMenuItem key={role.Id} value={role.Id}>
                  {role.Name}
                </StyledMenuItem>
              ))}
            </StyledTextField>
            <StyledTextField
              label="Shop"
              name="shop"
              value={shopName || ""}
              variant="outlined"
              disabled
            />
          </FieldRow>
        </Section>
        <Section>
          <SectionTitle>Address Information</SectionTitle>
          <FieldRow>
            <StyledTextField
              label="Address 1"
              name="address1"
              value={userDetails.userAdresses?.[0]?.address1 || ""}
              onChange={handleChange}
              variant="outlined"
            />
            <StyledTextField
              label="Address 2"
              name="address2"
              value={userDetails.userAdresses?.[0]?.address2 || ""}
              onChange={handleChange}
              variant="outlined"
            />
          </FieldRow>
          <FieldRow>
            <StyledTextField
              label="City"
              name="city"
              value={userDetails.userAdresses?.[0]?.city || ""}
              onChange={handleChange}
              variant="outlined"
            />
            <StyledTextField
              label="State"
              name="state"
              value={userDetails.state || ""}
              onChange={handleChange}
              variant="outlined"
            />
          </FieldRow>
          <FieldRow>
            <StyledTextField
              label="Country"
              name="country"
              value={userDetails.country || ""}
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
                <StyledMenuItem key={country.id} value={country.name}>
                  {country.name}
                </StyledMenuItem>
              ))}
            </StyledTextField>
            <StyledTextField
              label="PO Box"
              name="poBox"
              value={userDetails.userAdresses?.[0]?.postalCode || ""}
              onChange={handleChange}
              variant="outlined"
            />
          </FieldRow>
        </Section>
        <SaveButton variant="contained" onClick={handleSave}>
          Save
        </SaveButton>
      </AccountDetailsContainer>
    </SafeArea>
  );
};

export default AccountDetails;
