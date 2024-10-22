/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}',],
  theme: {
    extend: {
      colors: {
        'light-grey': '#E5E7EB',
        'online-blue': '#0B5374',
        'online-yellow': '#F9B759'
      },
      animation: {
        swing: 'swing 5s ease-in-out infinite',
      },
      keyframes: {
        swing: {
          '0%, 100%': { transform: 'rotate(7deg)', transformOrigin: 'top' },
          '50%': { transform: 'rotate(-7deg)', transformOrigin: 'top' },
        },
      },
    },
  },
  darkMode: 'selector',
  plugins: [],
};
