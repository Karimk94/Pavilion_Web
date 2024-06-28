import React, { useContext } from "react";
import { Avatar, List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import { styled } from '@mui/system';
import { useNavigate } from "react-router-dom";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";
import { AccountNavigator } from "../../../infrastructure/navigation/account.navigator";
import { colors } from "../../../infrastructure/theme/colors";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";

const TransparentSafeArea = styled('div')({
  backgroundColor: 'transparent',
  height: '100vh',
  padding: '1em',
});

const SettingsBackground = styled('div')({
  position: 'absolute',
  height: '100%',
  width: '100%',
  backgroundImage: 'url(/path/to/your/home_bg.jpg)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
});

const SettingsItem = styled(ListItem)({
  padding: '1em',
  backgroundColor: 'rgba(255, 255, 255, 0.4)',
  marginBottom: '1em',
  borderRadius: '8px',
});

const AvatarContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginBottom: '2em',
});

export const SettingsScreen = () => {
  const { onLogout, user } = useContext(AuthenticationContext);
  const navigate = useNavigate();

  return (
    <SettingsBackground>
      {user ? (
        <TransparentSafeArea>
          <AvatarContainer>
            <Avatar
              alt="User Avatar"
              src="/broken-image.jpg"
              sx={{ width: 180, height: 180, bgcolor: colors.brand.primary }}
            />
            <Spacer position="top" size="large">
              <Text variant="label">{user?.email}</Text>
            </Spacer>
          </AvatarContainer>
          <List>
            <SettingsItem button onClick={() => navigate("/favourites")}>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: colors.ui.error }}>
                  <i className="material-icons">favorite</i>
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Favourites" secondary="View your favourites" />
            </SettingsItem>
            <Spacer />
            <SettingsItem button onClick={() => null}>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: colors.ui.secondary }}>
                  <i className="material-icons">shopping_cart</i>
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Payment" />
            </SettingsItem>
            <Spacer />
            <SettingsItem button onClick={() => null}>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: colors.ui.secondary }}>
                  <i className="material-icons">history</i>
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Past Orders" />
            </SettingsItem>
            <Spacer />
            {user && (
              <SettingsItem button onClick={onLogout}>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: colors.ui.secondary }}>
                    <i className="material-icons">logout</i>
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Logout" />
              </SettingsItem>
            )}
          </List>
        </TransparentSafeArea>
      ) : (
        <AccountNavigator />
      )}
    </SettingsBackground>
  );
};
