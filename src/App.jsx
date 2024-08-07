import { BrowserRouter as Router } from "react-router-dom";
import AppNavigator from "./infrastructure/navigation/app.navigator";
import { AuthenticationContextProvider } from "./services/authentication/authentication.context";
import { CartContextProvider } from "./services/cart/cart.context";
import { FavouritesContextProvider } from "./services/favourites/favourites.context";
import { LocationContextProvider } from "./services/location/location.context";
import { ProductsContextProvider } from "./services/products/products.context";
import { ThemeContextProvider } from "./services/theme/theme.context";
import { ThemeProvider } from "styled-components";
import { theme } from "./infrastructure/theme";
import { useState } from "react";

function App() {
  const [currentTheme, setCurrentTheme] = useState(theme);

  const changeTheme = (newTheme) => {
    setCurrentTheme(newTheme);
  };

  return (
    <AuthenticationContextProvider>
      <ThemeContextProvider onChangeTheme={changeTheme}>
        <CartContextProvider>
          <FavouritesContextProvider>
            <LocationContextProvider>
              <ProductsContextProvider>
                <Router>
                  <ThemeProvider theme={currentTheme}>
                    <AppNavigator />
                  </ThemeProvider>
                </Router>
              </ProductsContextProvider>
            </LocationContextProvider>
          </FavouritesContextProvider>
        </CartContextProvider>
      </ThemeContextProvider>
    </AuthenticationContextProvider>
  );
}

export default App;
