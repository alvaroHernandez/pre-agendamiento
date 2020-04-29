import history from "../services/history";

export const httpClient = async (url, callbackResponse, callbackError) => {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const body = await response.json();
      callbackResponse(body);
    } else if (response.status === 401) {
      history.push("/Login");
    } else {
      callbackError();
    }
  } catch (e) {
    callbackError(e);
  }
};
