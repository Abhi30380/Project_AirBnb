/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      colors : {
        primary : '#FF385C',
        lightRed : '#E51D4F',
        darkRed : '#D80665'

      }
    },
  },
  plugins: [],
}

