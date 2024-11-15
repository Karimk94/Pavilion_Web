import fetchHttp from "../../utils/fetchHttp";
import { createRequestOptions } from "../../utils/request-options";

export const fetchUserCart = async (userId) => {
  const raw = { userId };
  const requestOptions = createRequestOptions(raw);

  const { response, errors } = await fetchHttp(`cart/getCart`, requestOptions);
  return response.data;
};

export const saveUserCart = async (userId, cart) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({ userId, cart });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  await fetchHttp("cart/saveCart", requestOptions);
};
