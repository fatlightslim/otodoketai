const colors = require("tailwindcss/colors")

module.exports = {
  mode: 'jit',
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        // "light-blue": colors.lightBlue,
                      
        "sky": colors.sky,
        teal: colors.teal,
        rose: colors.rose,
      },
    },
  },
  variants: {
    extend: {
      opacity: ["disabled"],
      cursor: ['hover', 'focus']
    },
  },
  plugins: [
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
  ],
}
