/** @type {import('tailwindcss').Config} */
module.exports = {
  // The site toggles a `dark` class on <html>, so use the class strategy.
  darkMode: 'class',
  // Scan every page so all utility classes (incl. arbitrary values) are kept.
  content: ['./*.html'],
  theme: {
    extend: {},
  },
  plugins: [],
};
