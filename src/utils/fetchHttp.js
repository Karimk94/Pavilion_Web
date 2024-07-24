import { host } from "./env";

async function sendHttpRequest(url, config) {
  try {
    const response = await fetch(`${host}${url}`, config);

    const resData = await response.json();

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return resData;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default async function fetchHttp(url, config) {
  let responseData = null;
  let requestErrors = [];

  if (!config) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({});

    config = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
  }

  try {
    const data = await sendHttpRequest(url, config);

    if (!data?.Succeeded && data?.Errors?.length > 0) {
      data?.Errors?.forEach((err) => {
        requestErrors.push(
          err.Message?.toLowerCase() == "badrequest"
            ? "Error Retrieving data"
            : err.Message
        );
      });
    } else {
      if (data?.Data) {
        responseData = data.Data;
      }
    }
  } catch (e) {
    requestErrors.push(e.Message);
  }

  return {
    response: responseData,
    errors: requestErrors,
  };
}
