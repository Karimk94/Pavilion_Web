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
import { FaGear } from "react-icons/fa6";
import { FaImagePortrait } from "react-icons/fa6";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";
import { AccountScreen } from "../../account/screens/account.screen";
import { colors } from "../../../infrastructure/theme/colors";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import { SafeArea } from "../../../components/utility/safe-area.component";

Modal.setAppElement("#root");

const UserMenuModalContainer = styled(Modal)`
  background: white;
  border-radius: 10px;
  padding: 20px;
  outline: none;
  color: black;
  font-family: "Roboto", sans-serif;
  position: fixed;
  top: 60px;
  right: 10px;
  z-index: 3;
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
  z-index: 4;

  &:hover {
    color: ${(props) => props.theme.colors.ui.secondary};
  }
`;

const TransparentSafeArea = styled.div`
  background-color: "transparent";
  padding: 1em;
  position: relative; /* Added to ensure child elements are positioned correctly */
  z-index: 3;
`;

const UserMenuItem = styled(ListItemButton)`
  padding: 1em;
  background-color: rgba(255, 255, 255, 0.4);
  margin-bottom: 1em;
  border-radius: 8px;
`;

const AvatarContainer = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2em;
`;

const StyledEmail = styled(Text)`
  font-family: inherit;
  font-size: 16px;
  font-weight: bold;
  color: ${colors.brand.primary};
  text-align: center;
`;

const UserMenuModal = ({ isOpen = false, onClose }) => {
  const { onLogout, user } = useContext(AuthenticationContext);
  const navigate = useNavigate();

  const handleItemClick = (path) => {
    onClose();
    navigate(path);
  };

  return (
    <SafeArea>
      <UserMenuModalContainer
        isOpen={isOpen}
        onRequestClose={onClose}
        contentLabel="User Menu Modal"
      >
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <TransparentSafeArea>
          {user ? (
            <>
              <AvatarContainer>
                <Avatar
                  alt="User Avatar"
                  src={`images/${user.photoUrl || "/users/default.jpg"}`}
                  sx={{
                    width: 100,
                    height: 100,
                    bgcolor: colors.brand.primary,
                  }}
                />
                <Spacer position="top" size="large">
                  <StyledEmail>{user?.email}</StyledEmail>
                </Spacer>
              </AvatarContainer>
              <List>
                <UserMenuItem onClick={() => handleItemClick("/orders")}>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: colors.ui.secondary }}>
                      <FaHistory />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="Orders" />
                </UserMenuItem>
                <Spacer />
                <UserMenuItem onClick={() => handleItemClick("/favourites")}>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: colors.ui.secondary }}>
                      <FaHeart />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="Favourites" />
                </UserMenuItem>
                <Spacer />
                <UserMenuItem
                  onClick={() => handleItemClick("/accountdetails")}
                >
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: colors.ui.secondary }}>
                      <FaImagePortrait />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="Account Details" />
                </UserMenuItem>
                <Spacer />
                <UserMenuItem onClick={() => handleItemClick("/payment")}>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: colors.ui.secondary }}>
                      <FaShoppingCart />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="Payment" />
                </UserMenuItem>
                <UserMenuItem onClick={() => handleItemClick("/settings")}>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: colors.ui.secondary }}>
                      <FaGear />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="Settings" />
                </UserMenuItem>
                <Spacer />
                {user && (
                  <UserMenuItem
                    onClick={() => {
                      onLogout();
                      handleItemClick("/");
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: colors.ui.error }}>
                        <FaSignOutAlt />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Logout" />
                  </UserMenuItem>
                )}
              </List>
            </>
          ) : (
            <AccountScreen />
          )}
        </TransparentSafeArea>
      </UserMenuModalContainer>
    </SafeArea>
  );
};

export default UserMenuModal;
