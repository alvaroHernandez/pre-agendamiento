/* eslint-disable no-console */

const UNAUTHORIZED = 'No autorizado';
const UNEXPECTED_ERROR_MESSAGE = 'Whoops! Algo no salió bien, intenta de nuevo';

function UnauthorizedError() {
  return { message: UNAUTHORIZED, unauthorized: true };
}

function getAccessToken() {
  let accessToken;
  try {
    accessToken = JSON.parse(localStorage.getItem('userAuth')).accessToken;
  } catch (e) {
    throw UnauthorizedError();
  }
  if (!accessToken) {
    throw UnauthorizedError;
  }
  return accessToken;
}

async function makeRequest(accessToken, url, method, body) {
  const requestPayload = body
    ? {
        method,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      }
    : {
        method,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(body),
      };

  return await fetch(url, requestPayload);
}

export const authenticatedHttpRequest = async (url, method, body) => {
  let accessToken = getAccessToken();

  let response;
  try {
    response = await makeRequest(accessToken, url, method, body);
  } catch (error) {
    console.log(JSON.stringify(error));
    throw Error(UNEXPECTED_ERROR_MESSAGE);
  }

  if (response.ok) {
    return await response.json();
  } else if (response.status === 401) {
    throw UnauthorizedError();
  } else {
    throw Error(UNEXPECTED_ERROR_MESSAGE);
  }
};
