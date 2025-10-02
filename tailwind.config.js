/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#f59e0b", // naranja
        secondary: "#fde68a", // pastel
        accent: "#78350f", // marrón oscuro
        cream: '#fffaf5',
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
