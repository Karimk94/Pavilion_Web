export const createRequestOptions = (rawBody, token) => {
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  if (token) {
    myHeaders.append("Authorization", `Bearer ${token}`);
  }

  return {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(rawBody),
    redirect: "follow",
  };
};
