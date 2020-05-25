import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { disableFetchMocks, enableFetchMocks } from 'jest-fetch-mock';
import Login from './Login';
import userEvent from '@testing-library/user-event';

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

test('should show required filed tooltip when login button is clicked without fill the required fiedls', async () => {
  const loginForm = render(<Login />);
  userEvent.click(loginForm.getByText(/Iniciar Sesión/i));
  expect(await loginForm.findByText(/Iniciar Sesión/i));
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
