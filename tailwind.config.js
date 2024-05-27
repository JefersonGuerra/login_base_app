/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'color_1': '#E0E0E0',
        'color_2': '#C5C5C5',
        'color_3': '#6A6C6A',
        'color_4': '#5A5C5A',
        'color_5': '#424242',
        'color_6': '#1A8251',
        'color_7': '#931515'
      }
    },
  },
  plugins: [],
}
