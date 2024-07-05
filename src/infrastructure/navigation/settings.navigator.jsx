import { Route, Routes } from 'react-router-dom';
import { CameraScreen } from "../../features/settings/screens/camera.screen";
import { FavouritesScreen } from "../../features/settings/screens/favourites.screen";
import SettingsModal from "../../features/settings/screens/settings.screen";

export const SettingsNavigator = () => (
  <Routes>
    <Route path="/" element={<SettingsModal />} />
    <Route path="/favourites" element={<FavouritesScreen />} />
    <Route path="/camera" element={<CameraScreen />} />
  </Routes>
);
