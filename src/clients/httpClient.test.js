import { disableFetchMocks, enableFetchMocks } from 'jest-fetch-mock';
import { httpClient } from './httpClient';
import history from '../services/history';

const stubHttpResponse = {
  fakeProperty: 'fakeValue',
};

const stubHttp401Response = {
  status: 401,
};

const stubHttp500Response = {
  status: 500,
};

const stubErrorResponse = new Error('Dinosaurio rex');

beforeAll(() => {
  enableFetchMocks();
});

afterAll(() => {
  disableFetchMocks();
  localStorage.removeItem('access_token');
});

test('should call response callback with body when response status is 200', async () => {
  localStorage.setItem('access_token', 'fake');
  const callbackResponse = jest.fn();

  fetch.mockIf('fakeUrl', () =>
    Promise.resolve(JSON.stringify(stubHttpResponse)),
  );

  await httpClient('fakeUrl', 'GET', callbackResponse, undefined);

  expect(callbackResponse).toHaveBeenCalledWith(stubHttpResponse);
});

test('should redirect to login when response status is 401', async () => {
  localStorage.setItem('access_token', 'fake');
  history.push = jest.fn();

  fetch.mockIf('fake401Url', () => Promise.resolve(stubHttp401Response));

  await httpClient('fake401Url', 'GET', undefined, undefined);

  expect(history.push).toHaveBeenCalledWith('/Login');
});

test('should call error callback when response status is 500', async () => {
  localStorage.setItem('access_token', 'fake');
  const errorCallback = jest.fn();

  fetch.mockIf('fake500Url', () => Promise.resolve(stubHttp500Response));

  await httpClient('fake500Url', 'GET', () => {}, errorCallback);

  expect(errorCallback).toHaveBeenCalled();
});

test('should call error callback when response an error ocurr during the call', async () => {
  localStorage.setItem('access_token', 'fake');
  const errorCallback = jest.fn();

  fetch.mockIf('fakeErrorUrl', () => Promise.reject(stubErrorResponse));

  await httpClient('fakeErrorUrl', 'GET', () => {}, errorCallback);

  expect(errorCallback).toHaveBeenCalledWith(stubErrorResponse);
});

test('should make http call with given method and headers with authorization from local storage', async () => {
  localStorage.setItem('access_token', 'fake');

  const method = 'GET';
  const callbackResponse = jest.fn();

  fetch.mockIf('fakeUrl', (req) => {
    if (
      req.headers.get('Authorization') ===
        `Bearer ${localStorage.getItem('access_token')}` &&
      req.method === method
    ) {
      return Promise.resolve(JSON.stringify(stubHttpResponse));
    }
    return Promise.reject();
  });

  await httpClient('fakeUrl', method, callbackResponse, () => {});
  expect(callbackResponse).toHaveBeenCalled();
});

test("should redirect to /login when access_toke in localStore doesn't exists", async () => {
  localStorage.removeItem('access_token');
  history.push = jest.fn();
  await httpClient(
    undefined,
    undefined,
    () => {},
    () => {},
  );
  expect(history.push).toHaveBeenCalledWith('/Login');
});
