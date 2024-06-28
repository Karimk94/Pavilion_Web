import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { CameraScreen } from "../../features/settings/screens/camera.screen";
import { FavouritesScreen } from "../../features/settings/screens/favourites.screen";
import { SettingsScreen } from "../../features/settings/screens/settings.screen";

export const SettingsNavigator = () => {
  return (
    <Routes>
      <Route path="/settings" element={<SettingsScreen />} />
      <Route path="/settings/favourites" element={<FavouritesScreen />} />
      <Route path="/settings/camera" element={<CameraScreen />} />
    </Routes>
  );
};
