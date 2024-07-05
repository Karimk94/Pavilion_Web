import { BrowserRouter as Router } from "react-router-dom";
import AppNavigator from "./infrastructure/navigation/app.navigator";
import { AuthenticationContextProvider } from "./services/authentication/authentication.context";
import { CartContextProvider } from "./services/cart/cart.context";
import { FavouritesContextProvider } from "./services/favourites/favourites.context";
import { LocationContextProvider } from "./services/location/location.context";
import { ProductsContextProvider } from "./services/products/products.context";
function App() {
  return (
    <div>
      <AuthenticationContextProvider>
        <CartContextProvider>
          <FavouritesContextProvider>
            <LocationContextProvider>
              <ProductsContextProvider>
                <Router>
                  <AppNavigator />
                </Router>
              </ProductsContextProvider>
            </LocationContextProvider>
          </FavouritesContextProvider>
        </CartContextProvider>
      </AuthenticationContextProvider>
    </div>
  );
}

export default App;
