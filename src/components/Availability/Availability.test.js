/* eslint-disable no-undef */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { render } from '@testing-library/react';
import { disableFetchMocks, enableFetchMocks } from 'jest-fetch-mock';
import { act } from 'react-dom/test-utils';
import Availability from './Availability';

const centros = {
  centros: [
    {
      id: 'd30cd5da-8424-4922-a7ff-4ecb670a6c0a',
      nombre: 'ACHS principal',
      disponibilidad: [
        {
          date: '17/4/2020',
          hourFrom: 10,
          hourTo: 11,
        },
        {
          date: '17/4/2020',
          hourFrom: 12,
          hourTo: 13,
        },
        {
          date: '17/4/2020',
          hourFrom: 15,
          hourTo: 16,
        },
      ],
    },
  ],
};
beforeAll(() => {
  enableFetchMocks();
  fetch.mockResponse(() => Promise.resolve(JSON.stringify(centros)));
});

afterAll(() => {
  disableFetchMocks();
});

test('renders hourFrom', async () => {
  let renderTitle;
  act(() => {
    renderTitle = render(<Availability />);
  });
  const hour = await renderTitle.findByText(/10/i);
  expect(hour).toBeInTheDocument();
});
