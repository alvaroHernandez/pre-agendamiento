import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import { disableFetchMocks, enableFetchMocks } from 'jest-fetch-mock';

beforeAll(() => {
  enableFetchMocks();
  fetch.mockResponse(() => Promise.resolve(JSON.stringify([])));
});

afterAll(() => {
  disableFetchMocks();
});

test('renders home page', async () => {
  localStorage.setItem('access_token', 'eyJhb');
  const { findByText } = render(<App />);
  const titleHome = await findByText(/Bienvenido a Pre-Agendamiento!/i);
  expect(titleHome).toBeInTheDocument();
  localStorage.removeItem('access_token');
});
