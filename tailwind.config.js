/** @type {import('tailwindcss').Config} */
export default {
  content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
          "Noto Color Emoji",
        ],
        title: ["Bebas Neue", "sans-serif"],
        shop: ["Ubuntu", "sans-serif"],
        button: ["Roboto Mono", "sans-serif"],
      },
      colors: {
        "main-blue": "#1F3044",
      },
      fontSize: {
        text: "15px",
        logo: "32px",
        h2: "28px",
        h3: "20px",
      },
      lineHeight: {
        button: "20px",
        h2: "32px",
        h3: "24px",
      },
    },
  },
  plugins: [],
};
