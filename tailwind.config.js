/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    './node_modules/vue-tailwind-datepicker/**/*.js',
  ],
  theme: {
    extend: {
      backgroundImage: {
        "app": "url('/img/2.webp')"
      }, 
      colors: {
        "vtd-primary":colors.blue
      }
    },
  },
  plugins: [],
}

