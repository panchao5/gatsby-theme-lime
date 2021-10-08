import { css, theme, TwStyle } from "twin.macro";

export const maxXL = (content: string | TwStyle) => {
  console.log(theme`screens.xl`);
  return css`
    @media (max-width: ${theme`screens.xl`}) {
      ${content}
    }
  `;
};
