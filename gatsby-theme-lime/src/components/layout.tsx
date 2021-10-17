import "twin.macro";
import { Fragment, ReactNode } from "react";
import GlobalStyles from "../styles/global-styles";
import Navbar from "./navbar";
import Footer from "./footer";
import useSiteMetadata from "../hooks/use-site-metadata";
import useLimeConfig from "../hooks/use-lime-config";

interface LayoutProps {
  children: ReactNode;
}

export default (props: LayoutProps) => {
  const siteMetadata = useSiteMetadata();
  const limeConfig = useLimeConfig();

  return (
    <Fragment>
      <GlobalStyles />
      <header>
        <Navbar siteMetadata={siteMetadata} limeConfig={limeConfig} />
      </header>
      {props.children}
      <Footer siteMetadata={siteMetadata} />
    </Fragment>
  );
};
