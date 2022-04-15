import React from "react";
import {
  cleanup,
  fireEvent,
  render,
  RenderResult,
} from "@testing-library/react";
import { Login } from "./login";
import { ValidationSpy } from "@/presentation/test";
import faker from "@faker-js/faker";

type SutTypes = {
  sut: RenderResult;
  validationSpy: ValidationSpy;
};

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy();
  validationSpy.errorMessage = faker.random.words();
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
      validationSpy,
    } = makeSut();
    const errorWrap = getByTestId("error-wrap");
    expect(errorWrap.childElementCount).toBe(0);
    const submit = getByTestId("submit") as HTMLButtonElement;
    expect(submit.disabled).toBe(true);
    const emailStatus = getByTestId("emailStatus");
    expect(emailStatus.title).toBe(validationSpy.errorMessage);
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
    const fakeEmail = faker.internet.email();
    fireEvent.input(email, {
      target: {
        value: fakeEmail,
      },
    });

    expect(validationSpy.fieldName).toEqual("email");
    expect(validationSpy.fieldValue).toEqual(fakeEmail);
  });
  test("Should call validation with correct password", () => {
    const {
      sut: { getByTestId },
      validationSpy,
    } = makeSut();
    const password = getByTestId("password");
    const fakePassword = faker.internet.password();

    fireEvent.input(password, {
      target: {
        value: fakePassword,
      },
    });

    expect(validationSpy.fieldName).toEqual("password");
    expect(validationSpy.fieldValue).toEqual(fakePassword);
  });
  test("Should show email error if validation fails", () => {
    const {
      sut: { getByTestId },
      validationSpy,
    } = makeSut();

    const email = getByTestId("email");
    const fakeEmail = faker.internet.email();

    fireEvent.input(email, {
      target: {
        value: fakeEmail,
      },
    });

    const emailStatus = getByTestId("emailStatus");
    expect(emailStatus.title).toBe(validationSpy.errorMessage);
    expect(emailStatus.textContent).toBe("🔴");
  });
});
