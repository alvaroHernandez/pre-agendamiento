import { render, fireEvent, screen } from '../../test-utils/render';
import React from 'react';
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
  await render(<Login />, { user: null });
  userEvent.click(screen.getByText(/Iniciar Sesión/i));
  expect(await screen.findByText(/Iniciar Sesión/i));
});

test('should show error when username or password is wrong', async () => {
  fetch.mockResponse(() => Promise.resolve(failedLoginResponse));
  await render(<Login />);

  fireEvent.change(screen.getByLabelText(/Nombre/i), {
    target: { value: 'wrongUsername' },
  });
  fireEvent.change(screen.getByLabelText(/Password/i), {
    target: { value: 'wrongPassword' },
  });
  fireEvent.click(screen.getByText(/Iniciar Sesión/i));

  const errorMessage = await screen.findByText(
    'Nombre y/o Password incorrecto',
  );
  expect(errorMessage).toBeInTheDocument();
});
