import React from "react";
import {
  cleanup,
  fireEvent,
  render,
  RenderResult,
} from "@testing-library/react";
import { Login } from "./login";
import { Validation } from "@/presentation/protocols/validation";

type SutTypes = {
  sut: RenderResult;
  validationSpy: ValidationSpy;
};

class ValidationSpy implements Validation {
  errorMessage: string;
  input: object;
  validate(input: object): string {
    this.input = input;
    return this.errorMessage;
  }
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy();
  const sut = render(<Login validation={validationSpy} />);
  return {
    sut,
    validationSpy,
  };
};

describe("Login page", () => {
  afterEach(cleanup);

  test("Should start with initial state", () => {
    const {
      sut: { getByTestId },
    } = makeSut();
    const errorWrap = getByTestId("error-wrap");
    expect(errorWrap.childElementCount).toBe(0);
    const submit = getByTestId("submit") as HTMLButtonElement;
    expect(submit.disabled).toBe(true);
    const emailStatus = getByTestId("emailStatus");
    expect(emailStatus.title).toBe("Campo obrigatório");
    expect(emailStatus.textContent).toBe("🔴");
    const passwordStatus = getByTestId("passwordStatus");
    expect(passwordStatus.title).toBe("Campo obrigatório");
    expect(passwordStatus.textContent).toBe("🔴");
  });

  test("Should call validation with correct email", () => {
    const {
      sut: { getByTestId },
      validationSpy,
    } = makeSut();
    const email = getByTestId("email");
    const password = getByTestId("password");
    fireEvent.input(email, {
      target: {
        value: "any_email",
      },
    });
    fireEvent.input(password, {
      target: {
        value: "any_password",
      },
    });
    expect(validationSpy.input).toEqual({
      email: "any_email",
    });
  });
});
