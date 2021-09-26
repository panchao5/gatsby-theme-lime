import "twin.macro";
import { Fragment, ReactNode } from "react";
import GlobalStyles from "../styles/global-styles";

interface LayoutProps {
  children: ReactNode;
}

export default (props: LayoutProps) => {
  return (
    <Fragment>
      <GlobalStyles />
      {props.children}
    </Fragment>
  );
};
