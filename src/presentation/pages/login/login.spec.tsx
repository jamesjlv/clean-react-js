import React from "react";
import { render } from "@testing-library/react";
import { Login } from "./login";
describe("Login page", () => {
  test("Should not render form status", () => {
    const { getByTestId } = render(<Login />);
    const errorWrap = getByTestId("error-wrap");
    expect(errorWrap.childElementCount).toBe(0);
  });
});
