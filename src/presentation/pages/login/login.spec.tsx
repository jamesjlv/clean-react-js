import React from "react";
import { render } from "@testing-library/react";
import { Login } from "./login";
describe("Login page", () => {
  test("Should start with initial state", () => {
    const { getByTestId } = render(<Login />);
    const errorWrap = getByTestId("error-wrap");
    expect(errorWrap.childElementCount).toBe(0);
    const submit = getByTestId("submit") as HTMLButtonElement;
    expect(submit.disabled).toBe(true);
    const emailStatus = getByTestId("email");
    expect(emailStatus.title).toBe("Campo obrigatório");
    expect(emailStatus.textContent).toBe("🔴");
    const passwordStatus = getByTestId("password");
    expect(passwordStatus.title).toBe("Campo obrigatório");
    expect(passwordStatus.textContent).toBe("🔴");
  });
});
