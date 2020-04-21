import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

// eslint-disable-next-line no-undef
test('renders home page', () => {
  // eslint-disable-next-line react/jsx-filename-extension
  const { getByText } = render(<App />);
  const titleHome = getByText(/Bienvenido a Pre-Agendamiento!/i);
  // eslint-disable-next-line no-undef
  expect(titleHome).toBeInTheDocument();
});
