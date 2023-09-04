/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  future: {
    hoverOnlyWhenSupported: true,
  },
  theme: {
    extend: {
      colors: {
        muted: "hsl(var(--color-muted))",
        black: "hsl(var(--color-black))",
        yellow: "hsl(var(--color-yellow))",
        sky: "hsl(var(--color-sky))",
        blue: "hsl(var(--color-blue))",
        pink: "hsl(var(--color-pink))",
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
