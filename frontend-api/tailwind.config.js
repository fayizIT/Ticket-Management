/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'], // Adjust the paths as necessary
  theme: {
    theme: {
      extend: {
        colors: {
          'dark-blue': '#003366', 
          'custom-blue': '#15196E', 
        },
        fontFamily: {
          panton: ['Panton Narrow', 'sans-serif'],
        },
      },
    },
  },
  plugins: [],
}
