import { createContext, useEffect, useState } from "react";

export const LocationContext = createContext();

export const LocationContextProvider = ({ children }) => {
  const [keyword, setKeyword] = useState("");
  const [countryCode, setCountryCode] = useState(null);
  const [countryName, setCountryName] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const onSearch = (searchKeyword) => {
    setIsLoading(true);
    setKeyword(searchKeyword);
  };

  const getCountryFromCoordinates = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
      );
      const data = await response.json();
      if (data) {
        setCountryCode(data.countryCode);
        setCountryName(data.countryName);
      }
    } catch (err) {
      return null;
    }
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          await getCountryFromCoordinates(latitude, longitude);
          setIsLoading(false);
        },
        (err) => {
          console.error("Error getting location", err);
          setError(err.message);
          setIsLoading(false);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    getLocation();
  }, []);

  return (
    <LocationContext.Provider
      value={{
        isLoading,
        error,
        countryCode,
        countryName,
        getLocation,
        search: onSearch,
        keyword,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};
