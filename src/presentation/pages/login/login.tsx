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

type Props = {
  validation: Validation;
};

export const Login: React.FC<Props> = ({ validation }: Props) => {
  const [state, setState] = useState({
    isLoading: false,
    emailError: "Campo obrigatório",
    passwordError: "Campo obrigatório",
    email: "",
    password: "",
    mainError: "",
  });

  function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    setState({ ...state, isLoading: true });
  }

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
        <form className={Styles.form} onSubmit={handleSubmit}>
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
          <span className={Styles.link}>Cadastre-se</span>
          <FormStatus />
        </form>
      </Context.Provider>
      <Footer />
    </div>
  );
};
