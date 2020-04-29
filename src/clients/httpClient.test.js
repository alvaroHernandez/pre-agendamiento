import { disableFetchMocks, enableFetchMocks } from "jest-fetch-mock";
import { httpClient } from "./httpClient";
import history from "../services/history";
// didnt throw error
// 200
// 401
// other

// error

const stubHttpResponse = {
  fakeProperty: "fakeValue",
};

const stubHttp401Response = {
  status: 401,
};

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
