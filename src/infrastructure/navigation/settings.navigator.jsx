import { Route, Routes } from "react-router-dom";
import { CameraScreen } from "../../features/settings/screens/camera.screen";
import { FavouritesScreen } from "../../features/settings/screens/favourites.screen";
import UserMenuModal from "../../features/user-menu/screens/user-menu.screen";

export const SettingsNavigator = () => (
  <Routes>
    <Route path="/" element={<UserMenuModal />} />
    <Route path="/favourites" element={<FavouritesScreen />} />
    <Route path="/camera" element={<CameraScreen />} />
  </Routes>
);
