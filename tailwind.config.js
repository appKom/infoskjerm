/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}',],
  theme: {
    extend: {
      colors: {
        'light-grey': '#E5E7EB',
        'online-blue': '#0B5374'
      },

      spacing: {
        '327': '327px',
        '182': '182.33px',
      },
    },
  },
  plugins: [],
};
