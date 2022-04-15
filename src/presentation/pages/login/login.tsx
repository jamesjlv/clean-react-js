import React, { useEffect, useState } from "react";
import {
  LoginHeader,
  FormStatus,
  Footer,
  Input,
} from "@/presentation/components";
import Context from "@/presentation/contexts/form/form-context";
import Styles from "./login-styles.scss";
import { Validation } from "@/presentation/protocols/validation";
import { Authentication } from "@/domain/usecases";
import { Link, useHistory } from "react-router-dom";

type Props = {
  validation: Validation;
  authentication: Authentication;
};

export const Login: React.FC<Props> = ({
  validation,
  authentication,
}: Props) => {
  const history = useHistory();
  const [state, setState] = useState({
    isLoading: false,
    emailError: "Campo obrigatório",
    passwordError: "Campo obrigatório",
    email: "",
    password: "",
    mainError: "",
  });

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    if (state.isLoading || state.emailError || state.passwordError) {
      return;
    }
    try {
      setState({ ...state, isLoading: true });
      const account = await authentication.auth({
        email: state.email,
        password: state.password,
      });
      localStorage.setItem("accessToken", account.accessToken);
      history.replace("/");
    } catch (error) {
      setState({ ...state, isLoading: false, mainError: error.message });
    }
  };

  useEffect(() => {
    setState({
      ...state,
      emailError: validation.validate("email", state.email),
      passwordError: validation.validate("password", state.password),
    });
  }, [state.email, state.password]);

  return (
    <div className={Styles.login}>
      <LoginHeader />
      <Context.Provider value={{ state, setState }}>
        <form
          data-testid="form"
          className={Styles.form}
          onSubmit={handleSubmit}
        >
          <h2>Login</h2>
          <Input type="email" name="email" placeholder="Digite seu e-mail" />
          <Input
            type="password"
            name="password"
            placeholder="Digite sua senha"
          />
          <button
            data-testid="submit"
            type="submit"
            disabled={!!state.emailError || !!state.passwordError}
          >
            Entrar
          </button>
          <Link data-testid="signup" to="/signup" className={Styles.link}>
            Cadastre-se
          </Link>
          <FormStatus />
        </form>
      </Context.Provider>
      <Footer />
    </div>
  );
};
