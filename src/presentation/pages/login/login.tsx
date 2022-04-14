import React from "react";
import { Spinner } from "@/presentation/components/spinner/spinner";

import Styles from "./login-styles.scss";
import { Logo } from "@/presentation/components/logo/logo";

export const Login: React.FC = () => {
  return (
    <div className={Styles.login}>
      <header className={Styles.header}>
        <Logo />
        <h1>4Dev - Enquetes para Programadores</h1>
      </header>
      <form action="#" className={Styles.form}>
        <h2>Login</h2>
        <div className={Styles.inputWrap}>
          <input type="email" name="email" placeholder="Digite seu e-mail" />
          <span className={Styles.status}>🔴</span>
        </div>
        <div className={Styles.inputWrap}>
          <input
            type="password"
            name="password"
            placeholder="Digite sua senha"
          />
          <span className={Styles.status}>🔴</span>
        </div>
        <button type="submit">Entrar</button>
        <span className={Styles.link}>Cadastre-se</span>
        <div className={Styles.loader}>
          <Spinner className={Styles.loading} />
          <span className={Styles.error}>Erro</span>
        </div>
      </form>
      <footer className={Styles.footer}></footer>
    </div>
  );
};