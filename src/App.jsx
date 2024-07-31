import { BrowserRouter as Router } from "react-router-dom";
import AppNavigator from "./infrastructure/navigation/app.navigator";
import { AuthenticationContextProvider } from "./services/authentication/authentication.context";
import { CartContextProvider } from "./services/cart/cart.context";
import { FavouritesContextProvider } from "./services/favourites/favourites.context";
import { LocationContextProvider } from "./services/location/location.context";
import { ProductsContextProvider } from "./services/products/products.context";
import { theme, darkTheme } from "./infrastructure/theme/index";
import { useState } from "react";
import { ThemeProvider } from "styled-components";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <div>
      <ThemeProvider theme={isDarkMode ? darkTheme : theme}>
        <AuthenticationContextProvider>
          <CartContextProvider>
            <FavouritesContextProvider>
              <LocationContextProvider>
                <ProductsContextProvider>
                  <Router>
                    <AppNavigator toggleTheme={toggleTheme} />
                  </Router>
                </ProductsContextProvider>
              </LocationContextProvider>
            </FavouritesContextProvider>
          </CartContextProvider>
        </AuthenticationContextProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
