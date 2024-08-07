import React, { createContext, useState, useEffect, useContext } from "react";
import { darkTheme, theme } from "../../infrastructure/theme";
import { AuthenticationContext } from "../authentication/authentication.context";
import fetchHttp from "../../utils/fetchHttp";
import { createRequestOptions } from "../../utils/request-options";

export const ThemeContext = createContext();

export const ThemeContextProvider = ({ children, onChangeTheme }) => {
  const { user } = useContext(AuthenticationContext);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (user) {
      setIsDarkMode(user.isDarkMode);
      changeTheme(user.isDarkMode ? darkTheme : theme);
    }
  }, [user]);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
    changeTheme(!isDarkMode ? darkTheme : theme);
  };

  const changeTheme = async (newTheme) => {
    onChangeTheme(newTheme);

    if (user) {
      const raw = { UserId: user.id, IsDarkMode: !isDarkMode };
      const requestOptions = createRequestOptions(raw, user?.token);

      const { response, errors } = await fetchHttp(
        "User/setusertheme",
        requestOptions
      );
    }
  };

  return (
    <ThemeContext.Provider
      value={{
        isDarkMode,
        toggleTheme,
        changeTheme,
        theme: isDarkMode ? darkTheme : theme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
