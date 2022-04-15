import React, { useContext } from "react";
import Styles from "./input-styles.scss";
import Context from "@/presentation/contexts/form/form-context";
type Props = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export const Input: React.FC<Props> = (props: Props) => {
  const { state, setState } = useContext(Context);
  const error = state[props.name + "Error"];

  const handleChange = (event: React.FocusEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  const getStatus = (): string => {
    return error ? "🔴" : "🟢";
  };
  const getTitle = (): string => {
    return error || "Tudo certo!";
  };
  return (
    <div className={Styles.inputWrap}>
      <input data-testid={props.name} onChange={handleChange} {...props} />
      <span
        data-testid={props.name + "Status"}
        title={getTitle()}
        className={Styles.status}
      >
        {getStatus()}
      </span>
    </div>
  );
};
