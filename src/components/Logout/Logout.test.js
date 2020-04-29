import React from "react";
import { fireEvent, render } from "@testing-library/react";
import Logout from "./Logout";
import history from "../../services/history";

test("get logged out through logout buttonand redirected to Login", async () => {
  history.push = jest.fn();

  const logout = render(<Logout />);

  fireEvent.click(logout.getByText(/Logout/i));

  expect(localStorage.getItem("access_token")).toEqual(null);
  expect(history.push).toHaveBeenCalledWith("/Login");
});
