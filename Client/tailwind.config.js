/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
        Gruppo: ["Gruppo", "sans-serif"],
        valky: ["Valky", "sans-serif"],
        smoochsans: ["SmoochSans", "sans-serif"],
      },
      colors: {
        gold: "#bfa582",
        bg: "#012b46",
        bglighter: "#04416e",
        bgdarker: "#00182b",
        accent1: "#013b58",
        accent2: "#011a33",
        green: "#2b4601",
        gray: "#eaeaea",
        orange: "#ff6b35",
        yellow: "#f4d03f",
        blue: "#46a2d9",
        text: "#e3e0eb",
        background: "#070609",
        primary: "#b2aac5",
        secondary: "#684561",
        accent: "#a4798d",
        card: "#2C2C2E",
        s1: "#271B26",
        s2: "#382635",
        s3: "#483044",
        s4: "#583B52",
      },
    },
    screens: {
      mobile: "480px",
    },
  },
  plugins: [],
};
