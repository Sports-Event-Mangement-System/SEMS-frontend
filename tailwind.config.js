/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        '1fr-5fr': '1fr 5fr', // Define custom fraction column layout
      },
      colors: {
        'theme-color': '#f1963b',
      },
    },
  },
  plugins: [],
}

