import React, { useContext } from "react";
import { Spinner } from "../spinner/spinner";
import Context from "@/presentation/contexts/form/form-context";
import Styles from "./form-status-styles.scss";

export const FormStatus: React.FC = () => {
  const {
    state: { isLoading, mainError },
  } = useContext(Context);

  return (
    <div className={Styles.loader} data-testid="error-wrap">
      {isLoading && <Spinner className={Styles.loading} />}
      {mainError && (
        <span className={Styles.error} data-testid="mainError">
          {mainError}
        </span>
      )}
    </div>
  );
};
