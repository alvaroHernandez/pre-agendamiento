const UNEXPECTED_ERROR_MESSAGE = 'Whoops! Algo no salió bien, intenta de nuevo';
const UNAUTHORIZED_ERROR_MESSAGE = 'Nombre y/o Password incorrecto';

const LOGIN_API_URL = `${process.env.REACT_APP_API_MANAGEMENT_URL}/Login`;

const handleServerError = () => {
  // TODO: log error to external service
  return { error: UNEXPECTED_ERROR_MESSAGE };
};

function composeRequestPayload(username, password) {
  return {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
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
      composeRequestPayload(username, password),
    );
    if (response.ok) {
      const authResult = await response.json();
      if (
        typeof authResult.token === 'string' &&
        typeof authResult.id === 'string' &&
        typeof authResult.name === 'string'
      ) {
        return {
          accessToken: authResult.token,
          userId: authResult.id,
          userName: authResult.name,
        };
      }
    }
    if (response.status === 401) {
      return { error: UNAUTHORIZED_ERROR_MESSAGE };
    }
    return handleServerError(
      `Unexpected response from Auth Service: ${response}`,
    );
  } catch (error) {
    return handleServerError(error);
  }
};

export default {
  authenticate,
};
