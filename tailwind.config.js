/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  future: {
    hoverOnlyWhenSupported: true,
  },
  theme: {
    extend: {
      colors: {
        muted: "var(--color-muted)",
        hover: "var(--color-hover)",
        black: "var(--color-black)",
        "black/2": "var(--color-black-2)",
        "black/90": "var(--color-black-90)",
        yellow: "var(--color-yellow)",
        sky: "var(--color-sky)",
        blue: "var(--color-blue)",
        pink: "var(--color-pink)",
        gray: "var(--color-gray)",
        brown: "var(--color-brown)",
        sea: "var(--color-sea)",
        green: "var(--color-green)",
        red: "var(--color-red)",
        tan: "var(--color-tan)",
        lightgray: "var(--color-lightgray)",
        accentblue: "var(--color-accentblue)",
      },
      boxShadow: {
        1: "1px 1px 0px 0px var(--color-black)",
        2: "2px 2px 0px 0px var(--color-black)",
        20: "0.2rem 0.2rem 0px 0px var(--color-black)",
        25: "0.25rem 0.25rem 0px 0px var(--color-black)",
        30: "0.3rem 0.3rem 0px 0px var(--color-black)",
        50: "0.5rem 0.5rem 0px 0px var(--color-black)",
      },
      fontFamily: {
        primary: ["var(--font-haas-text)"],
        title: ["var(--font-haas-disp)"],
      },
      keyframes: {
        extend: {
          "0%": {
            width: "0%",
            opacity: 1,
          },

          "95%": {
            width: "95%",
            opacity: 1,
          },
          "100%": {
            width: "100%",
            opacity: 0,
          },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
