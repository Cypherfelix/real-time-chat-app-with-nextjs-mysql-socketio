/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Russo One", ...defaultTheme.fontFamily.sans],
        fancy: ["Dancing Script"],
        nunito: ["nunito", "sans-serif"],
      },
    },
  },
  plugins: [],
};
