import React, { memo } from "react";

import Styles from "./footer-styles.scss";

type Props = React.HTMLAttributes<HTMLElement>;

const FooterComponent: React.FC<Props> = (props: Props) => {
  return <footer className={Styles.footer}></footer>;
};

export const Footer = memo(FooterComponent);
