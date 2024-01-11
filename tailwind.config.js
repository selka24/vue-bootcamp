import prose from "@tailwindcss/typography";
import daisyThemes from "daisyui/src/theming/themes";

/*eslint-env node*/
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui"), prose()],
  daisyui: {
    themes: [
      {
        light: {
          ...daisyThemes.light,
          primary: "#307959",
        },
        dark: {
          ...daisyThemes.dark,
          primary: "#307959",
        },
      },
    ],
  },
};
