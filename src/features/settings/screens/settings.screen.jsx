import {
  Avatar,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { useContext } from "react";
import {
  FaHeart,
  FaHistory,
  FaShoppingCart,
  FaSignOutAlt,
} from "react-icons/fa";
import { FaImagePortrait } from "react-icons/fa6";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";
import { AccountScreen } from "../../../features/account/screens/account.screen";
import { colors } from "../../../infrastructure/theme/colors";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";

Modal.setAppElement("#root");

const SettingsModalContainer = styled(Modal)`
  background: white;
  border-radius: 10px;
  padding: 20px;
  outline: none;
  color: black;
  font-family: "Roboto", sans-serif;
  position: fixed;
  top: 60px; /* Adjust to align below the nav */
  right: 10px;
  z-index: 2;
`;

const CloseButton = styled.button`
  background: transparent;
  color: ${(props) => props.theme.colors.ui.primary};
  border: none;
  cursor: pointer;
  font-size: 18px;
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 3; /* Ensure the close button is above other elements */

  &:hover {
    color: ${(props) => props.theme.colors.ui.secondary};
  }
`;

const TransparentSafeArea = styled.div`
  background-color: "transparent";
  padding: 1em;
  position: relative; /* Added to ensure child elements are positioned correctly */
  z-index: 2; /* Ensure the content is above the background but below the close button */
`;

const SettingsItem = styled(ListItemButton)({
  padding: "1em",
  backgroundColor: "rgba(255, 255, 255, 0.4)",
  marginBottom: "1em",
  borderRadius: "8px",
});

const AvatarContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginBottom: "2em",
});

const StyledEmail = styled(Text)`
  font-family: inherit;
  font-size: 16px;
  font-weight: bold;
  color: ${colors.brand.primary};
  text-align: center;
`;

const SettingsModal = ({ isOpen = false, onClose }) => {
  const { onLogout, user } = useContext(AuthenticationContext);
  const navigate = useNavigate();

  const handleItemClick = (path) => {
    onClose();
    navigate(path);
  };

  return (
    <SettingsModalContainer
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Settings Modal"
    >
      <CloseButton onClick={onClose}>&times;</CloseButton>
      <TransparentSafeArea>
        {user ? (
          <>
            <AvatarContainer>
              <Avatar
                alt="User Avatar"
                src={`images/${user.photoUrl || "/users/default.jpg"}`}
                sx={{ width: 100, height: 100, bgcolor: colors.brand.primary }}
              />
              <Spacer position="top" size="large">
                <StyledEmail>{user?.email}</StyledEmail>
              </Spacer>
            </AvatarContainer>
            <List>
              <SettingsItem button onClick={() => handleItemClick("/orders")}>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: colors.ui.secondary }}>
                    <FaHistory />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Orders" />
              </SettingsItem>
              <Spacer />
              <SettingsItem
                button
                onClick={() => handleItemClick("/favourites")}
              >
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: colors.ui.secondary }}>
                    <FaHeart />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Favourites" />
              </SettingsItem>
              <Spacer />
              <SettingsItem
                button
                onClick={() => handleItemClick("/accountdetails")}
              >
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: colors.ui.secondary }}>
                    <FaImagePortrait />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Account Details" />
              </SettingsItem>
              <Spacer />
              <SettingsItem button onClick={() => handleItemClick("/payment")}>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: colors.ui.secondary }}>
                    <FaShoppingCart />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Payment" />
              </SettingsItem>
              <Spacer />
              {user && (
                <SettingsItem
                  button
                  onClick={() => {
                    onLogout();
                  }}
                >
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: colors.ui.error }}>
                      <FaSignOutAlt />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="Logout" />
                </SettingsItem>
              )}
            </List>
          </>
        ) : (
          <AccountScreen />
        )}
      </TransparentSafeArea>
    </SettingsModalContainer>
  );
};

export default SettingsModal;
