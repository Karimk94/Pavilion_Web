import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { FavouritesScreen } from "../../features/settings/screens/favourites.screen";
import { SettingsScreen } from "../../features/settings/screens/settings.screen";
import { CameraScreen } from "../../features/settings/screens/camera.screen";

export const SettingsNavigator = () => (
  <Routes>
    <Route path="/" element={<SettingsScreen />} />
    <Route path="/favourites" element={<FavouritesScreen />} />
    <Route path="/camera" element={<CameraScreen />} />
  </Routes>
);
