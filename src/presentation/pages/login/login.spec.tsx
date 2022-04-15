import React from "react";
import {
  cleanup,
  fireEvent,
  render,
  RenderResult,
} from "@testing-library/react";
import { Login } from "./login";
import { AuthenticationSpy, ValidationStub } from "@/presentation/test";
import faker from "@faker-js/faker";

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

describe("Login page", () => {
  afterEach(cleanup);

  test("Should start with initial state", () => {
    const {
      sut: { getByTestId },
      validationSpy,
    } = makeSut({ validationError: faker.random.words() });
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
    } = makeSut({ validationError: faker.random.words() });

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
    } = makeSut({ validationError: faker.random.words() });

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
    } = makeSut();
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
    } = makeSut();
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
  test("Should enable submit button if form is valid", () => {
    const {
      sut: { getByTestId },
    } = makeSut();
    const email = getByTestId("email");
    fireEvent.input(email, {
      target: {
        value: faker.internet.email(),
      },
    });
    const password = getByTestId("password");
    fireEvent.input(password, {
      target: {
        password: faker.internet.email(),
      },
    });
    const submit = getByTestId("submit") as HTMLButtonElement;
    expect(submit.disabled).toBe(false);
  });
  test("Should show spinner on submit", () => {
    const {
      sut: { getByTestId },
    } = makeSut();
    const email = getByTestId("email");
    fireEvent.input(email, {
      target: {
        value: faker.internet.email(),
      },
    });
    const password = getByTestId("password");
    fireEvent.input(password, {
      target: {
        password: faker.internet.email(),
      },
    });
    const submit = getByTestId("submit") as HTMLButtonElement;
    fireEvent.click(submit);
    const spinner = getByTestId("spinner");
    expect(spinner).toBeTruthy();
  });
  test("Should call Authentication with correct values", () => {
    const {
      sut: { getByTestId },
      authenticationSpy,
    } = makeSut();
    const email = getByTestId("email");
    const password = getByTestId("password");
    const params = {
      email: faker.internet.email(),
      password: faker.internet.password(),
    };
    fireEvent.input(email, {
      target: {
        value: params.email,
      },
    });
    fireEvent.input(password, {
      target: {
        value: params.password,
      },
    });
    const submit = getByTestId("submit");
    fireEvent.click(submit);

    expect(authenticationSpy.params).toEqual({ ...params });
  });
});
