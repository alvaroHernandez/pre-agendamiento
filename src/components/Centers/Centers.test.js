import React from 'react';
import { render } from '@testing-library/react';
import Centers from './Centers';

test('renders centers', () => {
  const { getByText } = render(<Centers />);
  const titleCenters = getByText(/Centros médicos/i);
  expect(titleCenters).toBeInTheDocument();
});