import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { disableFetchMocks, enableFetchMocks } from 'jest-fetch-mock';
import { act } from 'react-dom/test-utils';
import { MemoryRouter } from 'react-router-dom';
import Login from './Login';

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

const loginResponse = {
  id: '1',
  name: 'fakeUsername',
  token: 'fakeToken',
};

beforeAll(() => {
  enableFetchMocks();
  fetch.mockResponse(() => Promise.resolve(JSON.stringify(loginResponse)));
});

afterAll(() => {
  disableFetchMocks();
});

test('get logged through login form and redirected to home', async () => {
  const loginForm = render(
    <MemoryRouter>
      <Login />
    </MemoryRouter>,
  );

  await act(async () => {
    fireEvent.change(loginForm.getByLabelText(/Nombre/i), {
      target: { value: 'fakeUsername' },
    });
    fireEvent.change(loginForm.getByLabelText(/Password/i), {
      target: { value: 'fakePassword' },
    });
    fireEvent.click(loginForm.getByText(/Acceder/i));
  });

  expect(localStorage.getItem('access_token')).toEqual(loginResponse.token);
  expect(mockHistoryPush).toHaveBeenCalledWith('/tabladisponibilidad');
});

test('should show required filed tooltip when login button is clicked without fill the required fiedls', async () => {
  localStorage.removeItem('access_token')
  const loginForm = render(
    <MemoryRouter>
      <Login />
    </MemoryRouter>,
  );
  fireEvent.click(loginForm.getByText(/Acceder/i));


  expect(localStorage.getItem('access_token')).toEqual(null);

});
