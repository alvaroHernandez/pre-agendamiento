import { getForUserAndCenter } from './appointmentsClient';
import { authenticatedHttpRequest } from '../services/auth/authenticatedHttpRequest';

jest.mock('../services/auth/authenticatedHttpRequest');
// authenticatedHttpRequest.mockResolvedValue([]);

test('should make get request with userId and centerId ', () => {
  const fakeAPI = (process.env.REACT_APP_API_MANAGEMENT_URL = 'fakeAPI');

  const userId = 1;
  const centerId = 2;
  const expectedUrl = `${fakeAPI}/user/${userId}/appointment/center/${centerId}`;
  getForUserAndCenter(['center'], { userId, centerId });

  expect(authenticatedHttpRequest).toHaveBeenCalledWith(expectedUrl, 'GET');
});
