import {
  Avatar,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { useContext, useRef } from "react";
import {
  FaHeart,
  FaHistory,
  FaShoppingCart,
  FaSignOutAlt,
} from "react-icons/fa";
import { FaGear } from "react-icons/fa6";
import { FaImagePortrait } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";
import { AccountScreen } from "../../account/screens/account.screen";
import { colors } from "../../../infrastructure/theme/colors";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import { SafeArea } from "../../../components/utility/safe-area.component";
import useOnClickOutside from "../../../hooks/useOnClickOutside";

const UserMenuContainer = styled.div`
  background-color: ${(props) => props.theme.colors.bg.primary};
  border-radius: 10px;
  padding: 20px;
  max-width: 300px;
  position: absolute;
  top: 60px;
  right: 0px;
  z-index: 1000;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  display: ${(props) => (props.isOpen ? "block" : "none")};
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
  position: relative;
  z-index: 3;
`;

const UserMenuItem = styled(ListItemButton)`
  padding: 1em;
  background-color: ${(props) => props.theme.colors.bg.primary};
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

const StyledMuiListItemText = styled(ListItemText)`
  .MuiListItemText-primary {
    color: ${(props) => props.theme.colors.ui.primary};
    &:hover {
      color: ${(props) => props.theme.colors.ui.secondary};
    }
  }
`;

const UserMenuModal = ({ isOpen = false, onClose }) => {
  const ref = useRef();
  const { onLogout, user } = useContext(AuthenticationContext);
  const navigate = useNavigate();

  useOnClickOutside(ref, onClose);

  const handleItemClick = (path) => {
    onClose();
    navigate(path);
  };

  return (
    <UserMenuContainer ref={ref} isOpen={isOpen}>
      <CloseButton onClick={onClose}>&times;</CloseButton>
      <TransparentSafeArea>
        {user ? (
          <>
            <AvatarContainer>
              <Avatar
                alt="User Avatar"
                src={`images/${user.photoUrl || "/users/default.jpg"}`}
                sx={{ width: 100, height: 100, bgcolor: "primary.main" }}
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
                <StyledMuiListItemText primary="Orders" />
              </UserMenuItem>
              <Spacer />
              <UserMenuItem onClick={() => handleItemClick("/favourites")}>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: colors.ui.secondary }}>
                    <FaHeart />
                  </Avatar>
                </ListItemAvatar>
                <StyledMuiListItemText primary="Favourites" />
              </UserMenuItem>
              <Spacer />
              <UserMenuItem onClick={() => handleItemClick("/accountdetails")}>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: colors.ui.secondary }}>
                    <FaImagePortrait />
                  </Avatar>
                </ListItemAvatar>
                <StyledMuiListItemText primary="Account Details" />
              </UserMenuItem>
              <Spacer />
              <UserMenuItem onClick={() => handleItemClick("/payment")}>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: colors.ui.secondary }}>
                    <FaShoppingCart />
                  </Avatar>
                </ListItemAvatar>
                <StyledMuiListItemText primary="Payment" />
              </UserMenuItem>
              <UserMenuItem onClick={() => handleItemClick("/settings")}>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: colors.ui.secondary }}>
                    <FaGear />
                  </Avatar>
                </ListItemAvatar>
                <StyledMuiListItemText primary="Settings" />
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
                  <StyledMuiListItemText primary="Logout" />
                </UserMenuItem>
              )}
            </List>
          </>
        ) : (
          <AccountScreen />
        )}
      </TransparentSafeArea>
    </UserMenuContainer>
  );
};

export default UserMenuModal;
