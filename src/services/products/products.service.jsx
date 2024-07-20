import { pascalToCamel } from "../../utils/array-transform";
import fetchHttp from "../../utils/fetchHttp";
import { createRequestOptions } from "../../utils/request-options";
//import { useContext } from "react";
//import { AuthenticationContext } from "../authentication/authentication.context";

export const productsRequest = async (loc, key) => {
  //const { user } = useContext(AuthenticationContext);

  //if (user) myHeaders.append("Authorization", user.token); *add later when token will be added to user

  const raw = { Iso: loc, Keyword: key };

  const requestOptions = createRequestOptions(raw);

  const { response, errors } = await fetchHttp(
    "Product/getproducts",
    requestOptions
  );
  if (response) {
    return response;
  } else {
    return error;
  }
};

export const productsTransform = (results = []) => {
  //*if any item needs to be transformed later use the array map and change it*

  return pascalToCamel(results);
};
