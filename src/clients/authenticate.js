const UNEXPECTED_ERROR_MESSAGE =
  "Error al contactar el servicio de autenticación";
const UNAUTHORIZED_ERROR_MESSAGE = "Nombre y Password incorrecto";

const LOGIN_API_URL = `${process.env.REACT_APP_API_MANAGEMENT_URL}/Login`;

const handleServerError = (error) => {
  // TODO: log to external service
  console.log(error);
  return { error: UNEXPECTED_ERROR_MESSAGE };
};

function composeRequestPayload(username, password) {
  return {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: username,
      password,
    }),
  };
}

export const authenticate = async (username, password) => {
  try {
    const response = await fetch(
      LOGIN_API_URL,
      composeRequestPayload(username, password)
    );
    if (response.ok) {
      return await response.json();
    }
    if (response.status === 401) {
      return { error: UNAUTHORIZED_ERROR_MESSAGE };
    }
    return handleServerError(
      `Unexpected response from Auth Service: ${response}`
    );
  } catch (error) {
    return handleServerError(error);
  }
};

export default {
  authenticate,
};
