/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{html,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        clr1: "#A00F14", // maroon
        clr2: "#CE2742", // dark pink
        clr3: "#FF798F", // pink
        clr4: "#FF999E", // light link
        clr5: "#F0DCE0", // even more light pink
      },
    },
  },
  plugins: [],
};
