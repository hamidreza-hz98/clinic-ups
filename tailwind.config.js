/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./hooks/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        surface: "#0d1420",
        primary: "#00dbe7",
        primaryLight: "#79aef8",
      },
      fontFamily: {
        sans: ["IRANSans", "Arial", "Helvetica", "sans-serif"],
      },
    },
  },
  plugins: [require("tailwindcss-rtl"), require("daisyui")],
  daisyui: {
    themes: false,
    base: false,
    styled: true,
    utils: true,
    logs: false,
  },
};
