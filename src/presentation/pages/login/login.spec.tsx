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
  fieldName: string;
  fieldValue: string;
  validate(fieldName: string, fieldValue: string): string {
    this.fieldName = fieldName;
    this.fieldValue = fieldValue;
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
    fireEvent.input(email, {
      target: {
        value: "any_email",
      },
    });

    expect(validationSpy.fieldName).toEqual("email");
    expect(validationSpy.fieldValue).toEqual("any_email");
  });
  test("Should call validation with correct password", () => {
    const {
      sut: { getByTestId },
      validationSpy,
    } = makeSut();
    const password = getByTestId("password");
    fireEvent.input(password, {
      target: {
        value: "any_password",
      },
    });

    expect(validationSpy.fieldName).toEqual("password");
    expect(validationSpy.fieldValue).toEqual("any_password");
  });
});
