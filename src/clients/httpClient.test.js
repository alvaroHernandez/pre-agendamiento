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
  fetch.mockResponse((req) =>
    req.url === "fakeUrl"
      ? Promise.resolve(JSON.stringify(stubHttpResponse))
      : console.log("no mock found for give url")
  );

  fetch.mockResponse((req) =>
    req.url === "fake401Url"
      ? Promise.resolve(stubHttp401Response)
      : console.log("no mock found for give url")
  );
});

afterAll(() => {
  disableFetchMocks();
});

test("should call response callback with body when response status is 200", async () => {
  const callbackResponse = jest.fn();

  await httpClient("fakeUrls", callbackResponse, undefined);

  expect(callbackResponse).toHaveBeenCalledWith(stubHttpResponse);
});

test("should redirect to login when response status is 401", async () => {
  history.push = jest.fn();
  const callbackResponse = jest.fn();

  await httpClient("fake401Url", undefined, undefined);

  expect(history.push).toHaveBeenCalledWith("/Login");
});
