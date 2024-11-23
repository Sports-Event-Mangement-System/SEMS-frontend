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
        'theme-color': '#405189',
      },
      width: {
        '70': '280px',  // expanded sidebar width
        '24': '96px',   // collapsed sidebar width
        '26': '104px',
      },
      transitionProperty: {
        'width': 'width',
        'spacing': 'margin, padding',
      }
    },
  },
  plugins: [],
}

