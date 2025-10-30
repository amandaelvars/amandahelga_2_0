/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // <— must include .tsx!
  ],
  theme: {
    extend: {
      colors: {
        brand: "#f47b20", // your logo orange
      },
    },
  },
  plugins: [],
};
