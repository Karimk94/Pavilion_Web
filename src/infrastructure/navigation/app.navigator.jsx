import React from "react";
import { FaGear, FaMap, FaShop, FaUtensils } from "react-icons/fa6";
import {
  NavLink,
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import styled from "styled-components";
import { MapScreen } from "../../features/map/screens/map.screen";
import { CartContextProvider } from "../../services/cart/cart.context";
import { FavouritesContextProvider } from "../../services/favourites/favourites.context";
import { LocationContextProvider } from "../../services/location/location.context";
import { ProductsContextProvider } from "../../services/products/products.context";
import { colors } from "../theme/colors";
import { ProductsNavigator } from "./products.navigator";
import { ShopsNavigator } from "./shops.navigator";
import { SettingsNavigator } from "./settings.navigator";

const TAB_ICON = {
  Products: <FaUtensils />,
  Shops: <FaShop />,
  Map: <FaMap />,
  Settings: <FaGear />,
};

const TAB_TEXT = {
  Products: "Products",
  Shops: "Shops",
  Map: "Map",
  Settings: "Settings",
};

const StyledNav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1em;
  background: ${(props) => props.theme.colors.brand.primary};

  @media (max-width: 600px) {
    padding: 0.5em;
  }
`;

const NavLinks = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-grow: 1;
  gap: 2em;
`;

const StyledNavLink = styled(NavLink)`
  color: ${colors.brand.muted};
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5em;
  padding: 0 1em;

  &.active {
    color: ${colors.brand.bright};
  }

  @media (max-width: 600px) {
    gap: 0;
    padding: 0.5em;

    span {
      display: none;
    }
  }
`;

const SettingsLink = styled(StyledNavLink)`
  margin-left: auto;
`;

const AppNavigator = () => (
  <FavouritesContextProvider>
    <LocationContextProvider>
      <ProductsContextProvider>
        <CartContextProvider>
          <Router>
            <StyledNav>
              <NavLinks>
                <StyledNavLink to="/products" title="Products">
                  {TAB_ICON.Products} <span>{TAB_TEXT.Products}</span>
                </StyledNavLink>
                <StyledNavLink to="/shops" title="Shops">
                  {TAB_ICON.Shops} <span>{TAB_TEXT.Shops}</span>
                </StyledNavLink>
                <StyledNavLink to="/map" title="Map">
                  {TAB_ICON.Map} <span>{TAB_TEXT.Map}</span>
                </StyledNavLink>
              </NavLinks>
              <SettingsLink to="/settings" title="Settings">
                {TAB_ICON.Settings} <span>{TAB_TEXT.Settings}</span>
              </SettingsLink>
            </StyledNav>
            <Routes>
              <Route path="/products/*" element={<ProductsNavigator />} />
              <Route path="/shops/*" element={<ShopsNavigator />} />
              <Route path="/map/*" element={<MapScreen />} />
              <Route path="/settings/*" element={<SettingsNavigator />} />
              <Route path="/" element={<Navigate to="/products" replace />} />
            </Routes>
          </Router>
        </CartContextProvider>
      </ProductsContextProvider>
    </LocationContextProvider>
  </FavouritesContextProvider>
);

export default AppNavigator;
