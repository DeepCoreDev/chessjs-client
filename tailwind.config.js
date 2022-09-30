/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./app/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          "50":  "#d1970f",
          "100": "#d1970f",
          "200": "#d1970f",
          "300": "#d1970f",
          "400": "#d1970f",
          "500": "#d1970f",
          "600": "#d1970f",
          "700": "#d1970f",
          "800": "#d1970f",
          "900": "#d1970f"
        }
      },
      height: {
        '128': '32rem',
      }
    },
  },
  plugins: [
    require('flowbite/plugin'),
    require('flowbite-typography'),
  ]
}
