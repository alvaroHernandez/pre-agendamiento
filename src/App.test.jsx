import React from 'react';
import { screen, render } from './test-utils/render';
import App from './App';
import { disableFetchMocks, enableFetchMocks } from 'jest-fetch-mock';
import { fireEvent } from '@testing-library/react';
import { getAll } from '../src/clients/centersClient';
import { getForUserAndCenter } from '../src/clients/appointmentsClient';
import userEvent from '@testing-library/user-event';

jest.mock('../src/clients/centersClient');
getAll.mockResolvedValue([]);

jest.mock('../src/clients/appointmentsClient');
getForUserAndCenter.mockResolvedValue([
  {
    id: 1,
    description: 'Cita de Alvaro',
    date: '11/5/2020',
    time: { hours: 14, minutes: 0 },
    slotId: '202005051400',
    healthcareFacility: null,
    hour: '14:00',
    type: 'userAppointment',
  },
  {
    id: 2,
    description: 'Dentista',
    date: '13/5/2020',
    time: { hours: 16, minutes: 0 },
    slotId: '202005081624',
    healthcareFacility: null,
    hour: '16:00',
    type: 'userAppointment',
  },
]);

const successfulLoginResponse = {
  id: '1',
  name: 'fakeUsername',
  token: 'fakeToken',
};

beforeAll(() => {
  enableFetchMocks();
});

afterAll(() => {
  disableFetchMocks();
});

test('get logged through login form and redirected to home', async () => {
  fetch.mockResponse(() =>
    Promise.resolve(JSON.stringify(successfulLoginResponse)),
  );

  await render(<App />, { user: null });
  let loginText = await screen.findByText(/Iniciar Sesión/i);
  expect(loginText).toBeInTheDocument();

  fireEvent.change(screen.getByLabelText(/Nombre/i), {
    target: { value: 'fakeUsername' },
  });
  fireEvent.change(screen.getByLabelText(/Password/i), {
    target: { value: 'fakePassword' },
  });
  fireEvent.click(screen.getByText(/Iniciar Sesión/i));

  const titleHome = await screen.findByText(/Bienvenido a Pre-Agendamiento!/i);
  expect(titleHome).toBeInTheDocument();

  userEvent.click(screen.getByText(/Logout/i));
  loginText = await screen.findByText(/Iniciar Sesión/i);
  expect(loginText).toBeInTheDocument();
});
