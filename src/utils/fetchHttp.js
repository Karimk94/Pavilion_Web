async function sendHttpRequest(url, config) {
  try { 
    const response = await fetch(url, config);

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
  let requestError = null;

  try {
    const data = await sendHttpRequest(url, config);

    if (!data?.Succeeded && data?.Errors?.length > 0) {
      data?.Errors?.forEach((err) => {
        console.error(
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
    requestError = e;
  }

  return {
    data: responseData,
    error: requestError,
  };
}
