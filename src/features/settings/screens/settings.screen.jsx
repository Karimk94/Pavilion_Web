import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import { styled } from "styled-components";
import { useContext } from "react";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import { colors } from "../../../infrastructure/theme/colors";
import { AccountScreen } from "../../../features/account/screens/account.screen";
import { FaHeart, FaShoppingCart, FaHistory, FaSignOutAlt } from "react-icons/fa";

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

const SettingsItem = styled(ListItem)({
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

const SettingsModal = ({ isOpen, onClose }) => {
  const { onLogout, user } = useContext(AuthenticationContext);
  const navigate = useNavigate();

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
                src={user.photoURL || "images/users/default.jpg"} // Update with user photo URL
                sx={{ width: 100, height: 100, bgcolor: colors.brand.primary }}
              />
              <Spacer position="top" size="large">
                <Text variant="label">{user?.email}</Text>
              </Spacer>
            </AvatarContainer>
            <List>
              <SettingsItem button onClick={() => navigate("/favourites")}>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: colors.ui.error }}>
                    <FaHeart />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Favourites"
                  secondary="View your favourites"
                />
              </SettingsItem>
              <Spacer />
              <SettingsItem button onClick={() => null}>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: colors.ui.secondary }}>
                    <FaShoppingCart />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Payment" />
              </SettingsItem>
              <Spacer />
              <SettingsItem button onClick={() => null}>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: colors.ui.secondary }}>
                    <FaHistory />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Past Orders" />
              </SettingsItem>
              <Spacer />
              {user && (
                <SettingsItem button onClick={onLogout}>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: colors.ui.secondary }}>
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
