import { createContext, useContext, useEffect, useState } from "react";
import { AuthenticationContext } from "../../services/authentication/authentication.context";

export const FavouritesContext = createContext();

export const FavouritesContextProvider = ({ children }) => {
  const { user } = useContext(AuthenticationContext);
  const [favourites, setFavourites] = useState([]);

  const saveFavourites = (value, uid) => {
    try {
      const jsonValue = JSON.stringify(value);
      localStorage.setItem(`favourites-${uid}`, jsonValue);
    } catch (e) {
      console.error("Error storing", e);
    }
  };

  const loadFavourites = (uid) => {
    try {
      const value = localStorage.getItem(`favourites-${uid}`);
      if (value !== null) {
        setFavourites(JSON.parse(value));
      }
    } catch (e) {
      console.error("Error loading", e);
    }
  };

  const add = (shop) => {
    setFavourites([...favourites, shop]);
  };

  const remove = (shop) => {
    const newFavourites = favourites.filter(
      (x) => x.placeId !== shop.placeId
    );
    setFavourites(newFavourites);
  };

  useEffect(() => {
    if (user && user.uid) {
      loadFavourites(user.uid);
    }
  }, [user]);

  useEffect(() => {
    if (user && user.uid && favourites.length) {
      saveFavourites(favourites, user.uid);
    }
  }, [favourites, user]);

  return (
    <FavouritesContext.Provider
      value={{
        favourites,
        addToFavourites: add,
        removeFromFavourites: remove,
      }}
    >
      {children}
    </FavouritesContext.Provider>
  );
};
