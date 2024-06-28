import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthenticationContext } from "../authentication/authentication.context";

export const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
  const { user } = useContext(AuthenticationContext);

  const [cart, setCart] = useState([]);
  const [shop, setShop] = useState(null);
  const [sum, setSum] = useState(0);

  const saveCart = (rst, crt, uid) => {
    try {
      const jsonValue = JSON.stringify({ shop: rst, cart: crt });
      localStorage.setItem(`cart-${uid}`, jsonValue);
    } catch (e) {
      console.error("Error storing", e);
    }
  };

  const loadCart = (uid) => {
    try {
      const value = localStorage.getItem(`cart-${uid}`);
      if (value !== null) {
        const { shop: rst, cart: crt } = JSON.parse(value);
        setShop(rst);
        setCart(crt);
      }
    } catch (e) {
      console.error("Error loading", e);
    }
  };

  useEffect(() => {
    if (user && user.uid) {
      loadCart(user.uid);
    }
  }, [user]);

  useEffect(() => {
    if (user && user.uid) {
      saveCart(shop, cart, user.uid);
    }
  }, [shop, cart, user]);

  useEffect(() => {
    if (!cart.length) {
      setSum(0);
      return;
    }
    const newSum = cart.reduce((acc, { price }) => {
      return acc + price;
    }, 0);
    setSum(newSum);
  }, [cart]);

  const add = (item, rst) => {
    if (!shop || shop.placeId !== rst.placeId) {
      setShop(rst);
      setCart([item]);
    } else {
      setCart([...cart, item]);
    }
  };

  const clear = () => {
    setCart([]);
    setShop(null);
  };

  return (
    <CartContext.Provider
      value={{
        addToCart: add,
        clearCart: clear,
        shop,
        cart,
        sum,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
