import React from "react";
import { render } from "@testing-library/react";
import App from "./App";
import {disableFetchMocks, enableFetchMocks} from "jest-fetch-mock";

beforeAll(() => {
  enableFetchMocks();
  fetch.mockResponse(() => Promise.resolve(JSON.stringify([])));
});

afterAll(() => {
  disableFetchMocks();
});

test("renders home page", () => {
  localStorage.setItem('access_token', 'eyJhb');
  const { getByText } = render(<App />);
  const titleHome = getByText(/Bienvenido a Pre-Agendamiento!/i);
  expect(titleHome).toBeInTheDocument();
  localStorage.removeItem('access_token');
});
