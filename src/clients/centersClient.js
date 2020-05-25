import { authenticatedHttpRequest } from '../services/auth/authenticatedHttpRequest';

function getAll(key) {
  const url = `${process.env.REACT_APP_API_MANAGEMENT_URL}/healthcarefacilities`;
  return authenticatedHttpRequest(url, 'GET');
}

export { getAll };
