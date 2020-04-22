import React from "react";
import { render } from "@testing-library/react";
import Centers from "./Centers";
import { disableFetchMocks, enableFetchMocks } from "jest-fetch-mock";
import { act } from "react-dom/test-utils";

const centros = {
  centros: [
    {
      id: "d30cd5da-8424-4922-a7ff-4ecb670a6c0a",
      nombre: "principal",
    },
    {
      id: "d30cd5da-8424-4922-a7ff-4ecb670a6c6h",
      nombre: "segundo",
    },
  ],
};
beforeAll(() => {
  enableFetchMocks();
  fetch.mockResponse((req) => Promise.resolve(JSON.stringify(centros)));
});

afterAll(() => {
  disableFetchMocks();
});

test("renders centers", async () => {
  let renderTitle;
  act(() => {
    renderTitle = render(<Centers />);
  });
  const titleCenters = await renderTitle.findByText(/Centros médicos/i);
  expect(titleCenters).toBeInTheDocument();
});

test("renders list of centers from api", async () => {
  let renderCenters;
  act(() => {
    renderCenters = render(<Centers />);
  });
  const centerPrincipal = await renderCenters.findByText(/principal/i);
  const centerSegundo = await renderCenters.findByText(/segundo/i);
  expect(centerPrincipal).toBeInTheDocument();
  expect(centerSegundo).toBeInTheDocument();
});
