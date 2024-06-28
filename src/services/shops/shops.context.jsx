import React, { useState, useContext, createContext, useEffect } from "react";

import {
  shopsRequest,
  shopsTransform,
} from "./shops.service";

import { LocationContext } from "../location/location.context";

export const ShopsContext = createContext();

export const ShopsContextProvider = ({ children }) => {
  const [shops, setShops] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { location } = useContext(LocationContext);

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
    if (location) {
      const locationString = `${location.lat},${location.lng}`;
      retrieveShops(locationString);
    }
  }, [location]);

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
