import React from "react";
import github from "prism-react-renderer/themes/github";
import { PrismThemeProvider } from "./src/components/prism-theming";

/**
 * @type {import("gatsby").GatsbySSR["wrapRootElement"]}
 */
export const wrapRootElement = ({ element }) => {
  return <PrismThemeProvider theme={github}>{element}</PrismThemeProvider>;
};
