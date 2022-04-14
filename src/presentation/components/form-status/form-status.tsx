import React from "react";
import { Spinner } from "../spinner/spinner";

import Styles from "./form-status-styles.scss";

export const FormStatus: React.FC = () => {
  return (
    <div className={Styles.loader}>
      <Spinner className={Styles.loading} />
      <span className={Styles.error}>Erro</span>
    </div>
  );
};
