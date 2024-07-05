import { createContext, useContext, useEffect, useState } from "react";
import { LocationContext } from "../location/location.context";
import { productsRequest, productsTransform } from "./products.service";
import { convertCurrency } from "../../utils/currency-converter.js"; // Make sure to import your conversion utility

export const ProductsContext = createContext();

export const ProductsContextProvider = ({ children }) => {
  const [keyword, setKeyword] = useState("");
  const [products, setProducts] = useState([]);
  const [currency, setCurrency] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { location, getLocation } = useContext(LocationContext);

  const retrieveProducts = async (location, key) => {
    setIsLoading(true);
    setProducts([]);

    try {
      const results = await productsRequest(location, key).then(productsTransform);
      const { currencyName, currencyCode, currencySymbol } = results;

      const convertedProducts = await Promise.all(
        results.products.map(async (product) => {
          const convertedPrice = await convertCurrency(product.price, "USD", currencyCode);
          return { ...product, convertedPrice };
        })
      );

      setIsLoading(false);
      setProducts(convertedProducts);
      setCurrency({ currencyName, currencyCode, currencySymbol });
    } catch (err) {
      setIsLoading(false);
      setError(err);
    }
  };

  const onSearch = (searchKeyword) => {
    setIsLoading(true);
    setKeyword(searchKeyword);
  };

  useEffect(() => {
    async function retrieveLocation() {
      await getLocation();

      if (location) {
        retrieveProducts(location, keyword);
      }
    }

    retrieveLocation();
  }, [keyword, location]);

  return (
    <ProductsContext.Provider
      value={{
        products,
        currency,
        setKeyword,
        search: onSearch,
        isLoading,
        error,
        keyword
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
