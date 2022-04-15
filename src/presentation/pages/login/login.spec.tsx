import React from "react";
import {
  cleanup,
  fireEvent,
  render,
  RenderResult,
} from "@testing-library/react";
import faker from "@faker-js/faker";
import "jest-localstorage-mock";
import { Login } from "./login";
import { AuthenticationSpy, ValidationStub } from "@/presentation/test";
import { InvalidCredentialsError } from "@/domain/errors";

type SutTypes = {
  sut: RenderResult;
  validationSpy: ValidationStub;
  authenticationSpy: AuthenticationSpy;
};

type SutParams = {
  validationError?: string;
};

const makeSut = (params?: SutParams): SutTypes => {
  const validationSpy = new ValidationStub();
  const authenticationSpy = new AuthenticationSpy();
  validationSpy.errorMessage = params?.validationError;
  const sut = render(
    <Login validation={validationSpy} authentication={authenticationSpy} />
  );
  return {
    sut,
    validationSpy,
    authenticationSpy,
  };
};

const simulateValidSubmit = (
  sut: RenderResult,
  email = faker.internet.email(),
  password = faker.internet.password()
): void => {
  populateEmailField(sut, email);
  populatePasswordField(sut, password);
  const submit = sut.getByTestId("submit");
  fireEvent.click(submit);
};

const populateEmailField = (
  sut: RenderResult,
  email = faker.internet.email()
): void => {
  const emailInput = sut.getByTestId("email");
  fireEvent.input(emailInput, {
    target: {
      value: email,
    },
  });
};
const populatePasswordField = (
  sut: RenderResult,
  password = faker.internet.password()
): void => {
  const passwordInput = sut.getByTestId("password");
  fireEvent.input(passwordInput, {
    target: {
      value: password,
    },
  });
};
const simulateStatusForField = (
  sut: RenderResult,
  fieldName: string,
  validationError?: string
): void => {
  const passwordStatus = sut.getByTestId(fieldName + "Status");
  expect(passwordStatus.title).toBe(validationError || "Tudo certo!");
  expect(passwordStatus.textContent).toBe(validationError ? "🔴" : "🟢");
};

describe("Login page", () => {
  afterEach(() => {
    cleanup();
    localStorage.clear();
  });
  beforeEach(() => {
    cleanup();
    localStorage.clear();
  });

  test("Should start with initial state", () => {
    const { sut, validationSpy } = makeSut({
      validationError: faker.random.words(),
    });
    const errorWrap = sut.getByTestId("error-wrap");
    expect(errorWrap.childElementCount).toBe(0);
    const submit = sut.getByTestId("submit") as HTMLButtonElement;
    expect(submit.disabled).toBe(true);
    simulateStatusForField(sut, "email", validationSpy.errorMessage);
    simulateStatusForField(sut, "password", validationSpy.errorMessage);
  });

  test("Should show email error if validation fails", () => {
    const { sut, validationSpy } = makeSut({
      validationError: faker.random.words(),
    });
    populateEmailField(sut);
    simulateStatusForField(sut, "email", validationSpy.errorMessage);
  });
  test("Should show password error if validation fails", () => {
    const { sut, validationSpy } = makeSut({
      validationError: faker.random.words(),
    });
    populatePasswordField(sut);
    simulateStatusForField(sut, "password", validationSpy.errorMessage);
  });
  test("Should show valid password state if Validation succeeds", () => {
    const { sut } = makeSut();
    populatePasswordField(sut);
    simulateStatusForField(sut, "password");
  });
  test("Should show valid email state if Validation succeeds", () => {
    const { sut } = makeSut();
    populateEmailField(sut);
    simulateStatusForField(sut, "email");
  });
  test("Should enable submit button if form is valid", () => {
    const { sut } = makeSut();
    populateEmailField(sut);
    populatePasswordField(sut);
    const submit = sut.getByTestId("submit") as HTMLButtonElement;
    expect(submit.disabled).toBe(false);
  });
  test("Should show spinner on submit", () => {
    const { sut } = makeSut();
    const email = faker.internet.email();
    const password = faker.internet.password();
    simulateValidSubmit(sut, email, password);
    const spinner = sut.getByTestId("spinner");

    expect(spinner).toBeTruthy();
  });
  test("Should call Authentication with correct values", () => {
    const { sut, authenticationSpy } = makeSut();
    const email = faker.internet.email();
    const password = faker.internet.password();
    simulateValidSubmit(sut, email, password);

    expect(authenticationSpy.params).toEqual({ email, password });
  });
  test("Should call Authentication only once", () => {
    const { sut, authenticationSpy } = makeSut();
    simulateValidSubmit(sut);
    simulateValidSubmit(sut);
    expect(authenticationSpy.callsCount).toBe(1);
  });
  test("Should not call Authentication if form is invalid", () => {
    const validationError = faker.random.words();
    const { sut, authenticationSpy } = makeSut({ validationError });
    populateEmailField(sut);
    fireEvent.submit(sut.getByTestId("form"));
    expect(authenticationSpy.callsCount).toBe(0);
  });
  test("Should present error if Authentication fails", async () => {
    const { sut, authenticationSpy } = makeSut();

    const error = new InvalidCredentialsError();
    jest
      .spyOn(authenticationSpy, "auth")
      .mockResolvedValueOnce(Promise.reject(error));

    simulateValidSubmit(sut);

    const errorWrap = sut.getByTestId("error-wrap");
    const mainError = await sut.findByTestId("mainError");
    expect(mainError.textContent).toBe(error.message);
    expect(errorWrap.childElementCount).toBe(1);
  });
  test("Should add accessToken to localStorage on success", async () => {
    const { sut, authenticationSpy } = makeSut();
    simulateValidSubmit(sut);
    await sut.findByTestId("form");
    // expect(localStorage.setItem).toHaveBeenCalledWith(
    //   "accessToken",
    //   authenticationSpy.account.accessToken
    // );
  });
});
