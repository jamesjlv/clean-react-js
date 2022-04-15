import { Login } from "@/presentation/pages";
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "@/presentation/styles/global.scss";

export const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={Login} />
      </Switch>
    </BrowserRouter>
  );
};
