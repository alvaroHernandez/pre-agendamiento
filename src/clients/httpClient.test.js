import { disableFetchMocks, enableFetchMocks } from "jest-fetch-mock";
import { httpClient } from "./httpClient";
import history from "../services/history";

const stubHttpResponse = {
  fakeProperty: "fakeValue",
};

const stubHttp401Response = {
  status: 401,
};

const stubHttp500Response = {
  status: 500,
};

const stubErrorResponse = new Error("Dinosaurio rex");

beforeAll(() => {
  enableFetchMocks();
});

afterAll(() => {
  disableFetchMocks();
});

test("should call response callback with body when response status is 200", async () => {
  const callbackResponse = jest.fn();
  fetch.mockIf("fakeUrl", (req) =>
    Promise.resolve(JSON.stringify(stubHttpResponse))
  );

  await httpClient("fakeUrl", callbackResponse, undefined);

  expect(callbackResponse).toHaveBeenCalledWith(stubHttpResponse);
});

test("should redirect to login when response status is 401", async () => {
  history.push = jest.fn();
  fetch.mockIf("fake401Url", (req) => Promise.resolve(stubHttp401Response));

  await httpClient("fake401Url", undefined, undefined);

  expect(history.push).toHaveBeenCalledWith("/Login");
});

test("should call error callback when response status is 500", async () => {
  const errorCallback = jest.fn();

  fetch.mockIf("fake500Url", (req) => Promise.resolve(stubHttp500Response));

  await httpClient("fake500Url", undefined, errorCallback);

  expect(errorCallback).toHaveBeenCalled();
});

test("should call error callback when response an error ocurr during the call", async () => {
  const errorCallback = jest.fn();

  fetch.mockIf("fakeErrorUrl", (req) => Promise.reject(stubErrorResponse));

  await httpClient("fakeErrorUrl", undefined, errorCallback);

  expect(errorCallback).toHaveBeenCalledWith(stubErrorResponse);
});
