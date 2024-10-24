/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'], // Adjust the paths as necessary
  theme: {
    theme: {
      extend: {
        colors: {
          'dark-blue': '#003366', // Your custom dark blue color
        },
        fontFamily: {
          'panton-narrow': ['Panton Narrow', 'sans-serif'], // Add your custom font
        },
      },
    },
  },
  plugins: [],
}
