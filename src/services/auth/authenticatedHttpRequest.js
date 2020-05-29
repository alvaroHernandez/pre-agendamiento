/* eslint-disable no-console */

import UnauthorizedError from './UnauthorizedError';

const UNAUTHORIZED_ERROR_MESSAGE = 'No autorizado';
const UNEXPECTED_ERROR_MESSAGE = 'Whoops! Algo no salió bien, intenta de nuevo';

function getAccessToken() {
  let accessToken;
  try {
    accessToken = JSON.parse(localStorage.getItem('userAuth')).accessToken;
  } catch (e) {
    throw new UnauthorizedError(UNAUTHORIZED_ERROR_MESSAGE);
  }
  if (!accessToken) {
    throw new UnauthorizedError(UNAUTHORIZED_ERROR_MESSAGE);
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
    throw new UnauthorizedError();
  } else {
    throw Error(UNEXPECTED_ERROR_MESSAGE);
  }
};
