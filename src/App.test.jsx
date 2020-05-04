import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

test("renders home page", () => {
  localStorage.setItem('access_token', 'eyJhb');
  const { getByText } = render(<App />);
  const titleHome = getByText(/Bienvenido a Pre-Agendamiento!/i);
  expect(titleHome).toBeInTheDocument();
  localStorage.removeItem('access_token');
});
