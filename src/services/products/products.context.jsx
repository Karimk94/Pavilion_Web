import { createContext, useContext, useEffect, useState } from "react";
import { LocationContext } from "../location/location.context";
import { productsRequest, productsTransform } from "./products.service";

export const ProductsContext = createContext();

export const ProductsContextProvider = ({ children }) => {
  const [keyword, setKeyword] = useState("");
  const [products, setProducts] = useState([]);
  const [currency, setCurrency] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { location, getLocation } = useContext(LocationContext);

  const retrieveProducts = (location, key) => {
    setIsLoading(true);
    setProducts([]);

      productsRequest(location, key)
        .then(productsTransform)
        .then((results) => {
          setIsLoading(false);
          setProducts(results.products);
          setCurrency({
            currencyName: results.currencyName,
            currencyCode: results.currencyCode,
            currencySymbol: results.currencySymbol,
          });
        })
        .catch((err) => {
          setIsLoading(false);
          setError(err);
        });
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
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
