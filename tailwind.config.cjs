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
      animation: {
        fadeIn: "fadeIn 0.5s ease 1",
        fadeOut: "fadeOut 0.5s ease 1 forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeOut: {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
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
