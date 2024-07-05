import { createContext, useEffect, useState } from "react";
import { pascalToCamel } from "../../utils/array-transform";
import fetchHttp from "../../utils/fetchHttp";

export const AuthenticationContext = createContext();

export const AuthenticationContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const userTransform = (results = []) => {
    return pascalToCamel(results);
  };

  useEffect(() => {
    // Load user from localStorage or sessionStorage if available
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } 
  }, []);

  const onLogin = async (email, password) => {

    setIsLoading(true);
    setError(null);

    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      const raw = JSON.stringify({ Username: email, Password: password });
    
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };
    
      const { data, error } = await fetchHttp(
        'User/login',
        requestOptions
      ).then(userTransform);

      if (data.isAuthenticated) { 
        setUser(data.user);
        localStorage.setItem("user", JSON.stringify(data.user));
      } else {
        setError(error || "Login failed");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const onRegister = async (email, password) => {
    
    setIsLoading(true);
    setError(null);

    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      const raw = JSON.stringify({ Email: email, Password: password });
    
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };
    
      const { data, error } = await fetchHttp(
        'User/register',
        requestOptions
      ).then(userTransform);

      if (data.isAuthenticated) { 
        setUser(data.user);
        localStorage.setItem("user", JSON.stringify(data.user));
      } else {
        setError(error || "Register failed");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const onLogout = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await fetchHttp("/api/logout", { method: "POST" });
      setUser(null);
      localStorage.removeItem("user");
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthenticationContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        isLoading,
        error,
        onLogin,
        onRegister,
        onLogout,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};
