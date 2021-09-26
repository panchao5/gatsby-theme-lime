import React from "react";
import dracula from "prism-react-renderer/themes/dracula";
import { PrismThemeProvider } from "./src/components/prism-theming";

/**
 * @type {import("gatsby").GatsbyBrowser["wrapRootElement"]}
 */
export const wrapRootElement = ({ element }) => {
  return <PrismThemeProvider theme={dracula}>{element}</PrismThemeProvider>;
};
