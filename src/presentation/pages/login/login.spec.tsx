import React from "react";
import {
  cleanup,
  fireEvent,
  render,
  RenderResult,
} from "@testing-library/react";
import { Login } from "./login";
import { ValidationStub } from "@/presentation/test";
import faker from "@faker-js/faker";

type SutTypes = {
  sut: RenderResult;
  validationSpy: ValidationStub;
};

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationStub();
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
    expect(passwordStatus.title).toBe(validationSpy.errorMessage);
    expect(passwordStatus.textContent).toBe("🔴");
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
  test("Should show password error if validation fails", () => {
    const {
      sut: { getByTestId },
      validationSpy,
    } = makeSut();

    const password = getByTestId("password");
    const fakepassword = faker.internet.password();

    fireEvent.input(password, {
      target: {
        value: fakepassword,
      },
    });

    const passwordStatus = getByTestId("passwordStatus");
    expect(passwordStatus.title).toBe(validationSpy.errorMessage);
    expect(passwordStatus.textContent).toBe("🔴");
  });
  test("Should show valid password state if Validation succeeds", () => {
    const {
      sut: { getByTestId },
      validationSpy,
    } = makeSut();
    validationSpy.errorMessage = null;
    const password = getByTestId("password");
    fireEvent.input(password, {
      target: {
        value: faker.internet.password(),
      },
    });

    const passwordStatus = getByTestId("passwordStatus");
    expect(passwordStatus.title).toBe("Tudo certo!");
    expect(passwordStatus.textContent).toBe("🟢");
  });
  test("Should show valid email state if Validation succeeds", () => {
    const {
      sut: { getByTestId },
      validationSpy,
    } = makeSut();
    validationSpy.errorMessage = null;
    const email = getByTestId("email");
    fireEvent.input(email, {
      target: {
        value: faker.internet.email(),
      },
    });

    const emailStatus = getByTestId("emailStatus");
    expect(emailStatus.title).toBe("Tudo certo!");
    expect(emailStatus.textContent).toBe("🟢");
  });
});
