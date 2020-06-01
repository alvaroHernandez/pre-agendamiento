import { authenticatedHttpRequest } from '../services/auth/authenticatedHttpRequest';

function getForUserAndCenter(key, { userId, centerId }) {
  const url = `${window._env_.REACT_APP_API_MANAGEMENT_URL}/user/${userId}/appointment/center/${centerId}`;
  const result = authenticatedHttpRequest(url, 'GET');
  return result;
}

export { getForUserAndCenter };
