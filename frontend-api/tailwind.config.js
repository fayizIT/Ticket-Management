/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {  // Remove the nested theme property
    extend: {
      colors: {
        'dark-blue': '#003366',
        'custom-blue': '#15196E',
      },
      fontFamily: {
        'barlow-condensed': ['Panton Narrow-Trial','Barlow Condensed', 'sans-serif'],
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.no-scrollbar': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
        },
        '.no-scrollbar::-webkit-scrollbar': {
          display: 'none',
        },
      });
    },
  ],
}