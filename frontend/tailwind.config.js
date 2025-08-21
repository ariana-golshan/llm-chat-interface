import scrollbar from "tailwind-scrollbar";

/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        vazir: ["Vazir", "sans-serif"],
        sans: [
          "ui-sans-serif",
          "-apple-system",
          "system-ui",
          "Segoe UI",
          "Helvetica",
          "Apple Color Emoji",
          "Arial",
          "sans-serif",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
        ],
      },
    },
  },
  plugins: [scrollbar({ nocompatible: true })],
};
