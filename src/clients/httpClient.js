import history from "../services/history";

export const httpClient = async (
  url,
  method,
  callbackResponse,
  callbackError
) => {
  if (localStorage.getItem("access_token") == null) {
    history.push("/Login");
    return;
  }
  try {
    const response = await fetch(url, {
      method,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });
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
