/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}',],
  theme: {
    fontFamily: {
      'cardo': ['cardo', 'sans-serif'],
      'opensans': ['Open Sans', 'sans-serif'],
    },
    extend: {
      colors: {
        'light-grey': '#E5E7EB',
        'online-blue': '#0B5374',
        'online-yellow': '#F9B759',
        'spotify-green': '#1DB954',
      },
      animation: {
        swing: 'swing 5s ease-in-out infinite',
        driftOff: 'driftOff 6s linear infinite',
      },
      keyframes: {
        swing: {
          '0%, 100%': { transform: 'rotate(7deg)', transformOrigin: 'top' },
          '50%': { transform: 'rotate(-7deg)', transformOrigin: 'top' },
        },
        driftOff: {
          '0%': { transform: 'translate(0)', opacity: '0' },
          '10%': { opacity: '1' },
          '100%': { transform: 'translate(400%, -200%) scale(0.75) rotate(-10deg)', opacity: '0' },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
    },
  },
  darkMode: 'selector',
  plugins: [],
};
