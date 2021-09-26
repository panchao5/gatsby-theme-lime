import React from "react";
import { Global, css } from "@emotion/react";
import { PrismTheme } from "prism-react-renderer";
import { usePrismTheme } from "../components/prism-theming";
import tw, { theme, GlobalStyles as BaseStyles } from "twin.macro";

const customStyles = (prismTheme: PrismTheme) => {
  const { color, backgroundColor } = prismTheme.plain;

  return css({
    html: css`
      ${color && { "--lime-pre-color": color }};
      ${backgroundColor && { "--lime-pre-bgcolor": backgroundColor }};
    `,
    body: {
      color: theme`colors.gray.700`,
      backgroundColor: theme`colors.gray.100`,
      ...tw`antialiased`,
    },
  });
};

const GlobalStyles = () => {
  const prismTheme = usePrismTheme();

  return (
    <React.Fragment>
      <BaseStyles />
      <Global styles={customStyles(prismTheme)} />
    </React.Fragment>
  );
};

export default GlobalStyles;
