import { pascalToCamel } from "../../utils/array-transform";
import { host } from "../../utils/env";
import fetchHttp from "../../utils/fetchHttp";
//import { useContext } from "react";
//import { AuthenticationContext } from "../authentication/authentication.context";

export const productsRequest = async (loc, key) => {
  //const { user } = useContext(AuthenticationContext);

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  //if (user) myHeaders.append("Authorization", user.token); *add later when token will be added to user
  
  const raw = JSON.stringify({ Iso: loc, Keyword: key });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const { data, error } = await fetchHttp(
    'Product/getproducts',
    requestOptions
  );
  if (data) {
    return data;
  } else {
    return error;
  }
};

export const productsTransform = (results = []) => {
  //*if any item needs to be transformed later use the array map and change it*

  return pascalToCamel(results);
};
