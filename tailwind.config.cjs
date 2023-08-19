/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src", "./src/**/*.{js,jsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {},
      fontFamily: {},
      backgroundColor: {
        "dark-color": "rgb(24 24 27)",
      },
    },
    screens: {
      xs: "480px",
      ss: "620px",
      sm: "768px",
      md: "1060px",
      lg: "1200px",
      xl: "1700px",
    },
  },
  plugins: [],
  darkMode: "class",
};
