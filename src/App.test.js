import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders series title', () => {
  const { getByText } = render(<App />);
  const titleSeries = getByText(/Series/i);
  expect(titleSeries).toBeInTheDocument();
});

test('renders movies title', () => {
  const { getByText } = render(<App />);
  const titleMovies = getByText(/Movies/i);
  expect(titleMovies).toBeInTheDocument();
});
