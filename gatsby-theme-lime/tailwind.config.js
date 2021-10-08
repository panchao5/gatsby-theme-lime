const plugin = require("tailwindcss/plugin");
const colors = require("tailwindcss/colors");
const aspectRatio = require("@tailwindcss/aspect-ratio");
const typography = require("@tailwindcss/typography");

module.exports = {
  // purge: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "media", // or 'media' or 'class'
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      black: colors.black,
      white: colors.white,
      gray: colors.blueGray,
      primary: colors.lime,
      info: colors.sky,
      secondary: colors.yellow,
      success: colors.emerald,
      warning: colors.amber,
      danger: colors.red,
    },
    screens: {
      sm: "640px",
      "sm-only": { max: "639px" },
      md: "768px",
      "lt-md": { max: "767px" },
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      typography: (theme) => ({
        DEFAULT: {
          css: {
            pre: {
              color: "var(--pre-color, #393A34)",
              backgroundColor: "var(--pre-bgcolor, #f6f8fa)",
            },
            code: {
              color: theme("colors.secondary.400"),
            },
          },
        },
      }),
    },
  },
  plugins: [
    plugin(function ({ theme, addUtilities, addComponents }) {
      addUtilities(
        {
          ".styled-underline": {
            "--underline-color": theme("colors.primary.400"),
            "--underline-width": "0.25em",
            background:
              "linear-gradient(90deg, var(--underline-color) 0, var(--underline-color) 100%) no-repeat",
            "background-size": "90% var(--underline-width)",
            "background-position": "left calc(1em - var(--underline-width))",
          },
        },
        {
          variants: ["hover", "responsive"],
        }
      );
    }),
    aspectRatio,
    typography,
  ],
};
