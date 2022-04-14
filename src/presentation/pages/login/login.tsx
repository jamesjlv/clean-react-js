import React from "react";
import { Spinner } from "@/presentation/components/spinner/spinner";

import Styles from "./login-styles.scss";

import { LoginHeader } from "@/presentation/components/login-header/login-header";
import { Footer } from "@/presentation/components/footer/footer";
import { Input } from "@/presentation/components/input/input";

export const Login: React.FC = () => {
  return (
    <div className={Styles.login}>
      <LoginHeader />
      <form action="#" className={Styles.form}>
        <h2>Login</h2>
        <Input type="email" name="email" placeholder="Digite seu e-mail" />
        <Input type="password" name="password" placeholder="Digite sua senha" />
        <button type="submit">Entrar</button>
        <span className={Styles.link}>Cadastre-se</span>
        <div className={Styles.loader}>
          <Spinner className={Styles.loading} />
          <span className={Styles.error}>Erro</span>
        </div>
      </form>
      <Footer />
    </div>
  );
};
