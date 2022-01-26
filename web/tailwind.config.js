const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  mode: 'jit',
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#3f6212',
        secondary: '#006DEB',
        success: '#96E770',
        error: '#E24F3A',
      },
    },
  },
  plugins: [],
};
