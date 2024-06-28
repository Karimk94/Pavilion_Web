import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppNavigator from "./app.navigator";

const MainNavigation = () => {

  return (
    <Router>
      <AppNavigator />
    </Router>
  );
};

export default MainNavigation;
