import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { disableFetchMocks, enableFetchMocks } from 'jest-fetch-mock';
import { act } from 'react-dom/test-utils';
import Login from './Login';
import history from '../../services/history';

const successfulLoginResponse = {
  id: '1',
  name: 'fakeUsername',
  token: 'fakeToken',
};

const failedLoginResponse = {
  status: 401,
};

beforeAll(() => {
  enableFetchMocks();
});

afterAll(() => {
  disableFetchMocks();
});

afterEach(() => {
  localStorage.removeItem('access_token');
});

test('get logged through login form and redirected to home', async () => {
  history.push = jest.fn();
  fetch.mockResponse(() =>
    Promise.resolve(JSON.stringify(successfulLoginResponse)),
  );
  const loginForm = render(<Login />);

  await act(async () => {
    fireEvent.change(loginForm.getByLabelText(/Nombre/i), {
      target: { value: 'fakeUsername' },
    });
    fireEvent.change(loginForm.getByLabelText(/Password/i), {
      target: { value: 'fakePassword' },
    });
    fireEvent.click(loginForm.getByText(/Iniciar Sesión/i));
  });

  expect(localStorage.getItem('access_token')).toEqual(
    successfulLoginResponse.token,
  );
  expect(localStorage.getItem('user_id')).toEqual(successfulLoginResponse.id);
  expect(localStorage.getItem('user_name')).toEqual(
    successfulLoginResponse.name,
  );
  expect(history.push).toHaveBeenCalledWith('/');
});

test('should show required filed tooltip when login button is clicked without fill the required fiedls', async () => {
  const loginForm = render(<Login />);
  fireEvent.click(loginForm.getByText(/Iniciar Sesión/i));

  expect(localStorage.getItem('access_token')).toEqual(null);
});

test('should show error when username or password is wrong', async () => {
  fetch.mockResponse(() => Promise.resolve(failedLoginResponse));
  const loginForm = render(<Login />);

  fireEvent.change(loginForm.getByLabelText(/Nombre/i), {
    target: { value: 'wrongUsername' },
  });
  fireEvent.change(loginForm.getByLabelText(/Password/i), {
    target: { value: 'wrongPassword' },
  });
  fireEvent.click(loginForm.getByText(/Iniciar Sesión/i));

  const errorMessage = await loginForm.findByText(
    'Nombre y/o Password incorrecto',
  );
  expect(errorMessage).toBeInTheDocument();
});
