import React, { createContext, useContext, ReactNode } from "react";
import { PrismTheme } from "prism-react-renderer";
import defaultTheme from "prism-react-renderer/themes/dracula";

const PrismThemeContext = createContext<PrismTheme>(defaultTheme as PrismTheme);

interface PrismThemeProviderProps {
  theme: PrismTheme;
  children: ReactNode;
}

export const PrismThemeProvider = ({
  theme,
  children,
}: PrismThemeProviderProps) => {
  return (
    <PrismThemeContext.Provider value={theme}>
      {children}
    </PrismThemeContext.Provider>
  );
};

export const usePrismTheme = () => {
  return useContext(PrismThemeContext);
};
