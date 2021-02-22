const colors = require('tailwindcss/colors')

module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {

    colors: {
      "light-blue": colors.lightBlue,
      teal: colors.teal,
      rose: colors.rose,
    },
    },
  },
  variants: {
    extend: {
    },
  },
  plugins: [require("@tailwindcss/forms")],
}
