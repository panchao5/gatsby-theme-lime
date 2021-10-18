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
              color: "var(--lime-pre-color, #393A34)",
              backgroundColor: "var(--lime-pre-bgcolor, #f6f8fa)",
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
            "--lime-underline-color": theme("colors.primary.400"),
            "--lime-underline-width": "0.25em",
            background:
              "linear-gradient(90deg, var(--lime-underline-color) 0, var(--lime-underline-color) 100%) no-repeat",
            "background-size": "90% var(--lime-underline-width)",
            "background-position":
              "left calc(1em - var(--lime-underline-width))",
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
