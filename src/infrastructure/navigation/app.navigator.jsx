import { useContext, useState } from "react";
import { FaShoppingCart, FaUserCircle } from "react-icons/fa";
import { FaMap, FaShop, FaUtensils } from "react-icons/fa6";
import {
  NavLink,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import styled from "styled-components";
import CartButton from "../../components/cart/cart-button.component";
import AccountDetails from "../../features/account/screens/account-details.screen";
import CartModal from "../../features/cart/screens/cart-modal.component";
import { MapScreen } from "../../features/map/screens/map.screen";
import SettingsModal from "../../features/settings/screens/settings.screen";
import { AuthenticationContext } from "../../services/authentication/authentication.context";
import { CartContext } from "../../services/cart/cart.context";
import { ProductsContext } from "../../services/products/products.context";
import { colors } from "../theme/colors";
import { ProductsNavigator } from "./products.navigator";
import { ShopsNavigator } from "./shops.navigator";

const TAB_ICON = {
  Products: <FaUtensils />,
  Shops: <FaShop />,
  Map: <FaMap />,
};

const TAB_TEXT = {
  Products: "Products",
  Shops: "Shops",
  Map: "Map",
};

const StyledNav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5em;
  background: ${(props) => props.theme.colors.brand.primary};
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
    color: ${colors.brand.bright}; /* Adjust the color to your preference */
  }
`;

const CartIconContainer = styled.div`
  position: fixed;
  top: 80px;
  right: 10px;
  cursor: pointer;
  color: ${colors.brand.muted};
`;

const ProfileIconContainer = styled.div`
  position: relative;
  margin-left: auto;
  cursor: pointer;
`;

const ProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
`;

const AppNavigator = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const { cart } = useContext(CartContext);
  const { currency } = useContext(ProductsContext);
  const { user } = useContext(AuthenticationContext);

  const defaultProfilePicture = "/users/default.jpg";

  return (
    <>
      <StyledNav>
        <NavLinks>
          <StyledNavLink to="/products" title="Products">
            {TAB_ICON.Products} {TAB_TEXT.Products}
          </StyledNavLink>
          <StyledNavLink to="/shops" title="Shops">
            {TAB_ICON.Shops} {TAB_TEXT.Shops}
          </StyledNavLink>
          <StyledNavLink to="/map" title="Map">
            {TAB_ICON.Map} {TAB_TEXT.Map}
          </StyledNavLink>
        </NavLinks>
        <CartIconContainer onClick={() => setIsCartOpen(true)}>
          <CartButton itemCount={cart.length}>
            <FaShoppingCart />
          </CartButton>
        </CartIconContainer>
        <ProfileIconContainer onClick={() => setIsSettingsOpen(true)}>
          {user ? (
            <ProfileImage
              src={`images/${user.photoUrl || defaultProfilePicture}`}
              alt="Profile"
            />
          ) : (
            <FaUserCircle size={40} color={colors.brand.muted} />
          )}
        </ProfileIconContainer>
      </StyledNav>
      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        currency={currency}
      />
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
      <Routes>
        <Route path="/products/*" element={<ProductsNavigator />} />
        <Route path="/shops/*" element={<ShopsNavigator />} />
        <Route path="/map/*" element={<MapScreen />} />
        <Route path="/accountdetails/*" element={<AccountDetails />} />
        <Route path="/" element={<Navigate to="/products" replace />} />
      </Routes>
    </>
  );
};

export default AppNavigator;
