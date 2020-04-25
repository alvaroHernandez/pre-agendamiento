import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

test("renders home page", () => {
  const { getByText } = render(<App />);
  const titleHome = getByText(/Bienvenido a Pre-Agendamiento!/i);
  expect(titleHome).toBeInTheDocument();
});
