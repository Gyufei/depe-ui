/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  future: {
    hoverOnlyWhenSupported: true,
  },
  theme: {
    extend: {
      colors: {
        black: "#0E043E",
        yellow: "#E8F453",
        sky: "#DBFDF0",
        blue: "#E8F0FE",
        pink: "#0E043E",
      },
      boxShadow: {
        1: "1px 1px 0px 0px",
        20: "0.2rem 0.2rem 0px 0px",
        25: "0.25rem 0.25rem 0px 0px",
        30: "0.3rem 0.3rem 0px 0px",
        50: "0.5rem 0.5rem 0px 0px",
      },
      fontFamily: {
        primary: ["var(--font-haas-text)"],
        title: ["var(--font-haas-disp)"],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
