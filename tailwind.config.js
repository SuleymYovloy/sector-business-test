/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'white-bg': '#fff',
        'primary-bg': '#5A5C66',
        'secondary-bg': '#474955',
        'color-dark': '#474955',
        border: '#E3E6EC',
        'active-page': '#7EBC3C',
      },
    },
  },
  plugins: [],
};
