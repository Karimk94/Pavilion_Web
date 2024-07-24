import { useState, useContext, createContext, useEffect } from "react";

import { shopsRequest, shopsTransform } from "./shops.service";

import { LocationContext } from "../location/location.context";

export const ShopsContext = createContext();

export const ShopsContextProvider = ({ children }) => {
  const [shops, setShops] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { countryCode } = useContext(LocationContext);

  const retrieveShops = (loc) => {
    setIsLoading(true);
    setShops([]);

    setTimeout(() => {
      shopsRequest(loc)
        .then(shopsTransform)
        .then((results) => {
          setIsLoading(false);
          setShops(results);
        })
        .catch((err) => {
          setIsLoading(false);
          setError(err);
        });
    }, 2000);
  };
  useEffect(() => {
    if (countryCode) {
      const locationString = `${countryCode.lat},${countryCode.lng}`;
      retrieveShops(locationString);
    }
  }, [countryCode]);

  return (
    <ShopsContext.Provider
      value={{
        shops,
        isLoading,
        error,
      }}
    >
      {children}
    </ShopsContext.Provider>
  );
};
