import { getAll } from './centersClient';
import { authenticatedHttpRequest } from '../services/auth/authenticatedHttpRequest';

jest.mock('../services/auth/authenticatedHttpRequest');

test('should make get request', () => {
  const fakeAPI = (process.env.REACT_APP_API_MANAGEMENT_URL = 'fakeAPI');

  const expectedUrl = `${fakeAPI}/healthcarefacilities`;
  getAll(['centers']);

  expect(authenticatedHttpRequest).toHaveBeenCalledWith(expectedUrl, 'GET');
});
