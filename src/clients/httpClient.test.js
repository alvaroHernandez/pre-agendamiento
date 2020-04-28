import { disableFetchMocks, enableFetchMocks } from "jest-fetch-mock";
import { httpClient } from "./httpClient";

// didnt throw error
// 200
// 401
// other

// error

const stubHttpResponse = {
  fakeProperty: "fakeValue",
};

beforeAll(() => {
  enableFetchMocks();
  fetch.mockResponse((req) =>
    req.url === "fakeUrl"
      ? Promise.resolve(JSON.stringify(stubHttpResponse))
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
