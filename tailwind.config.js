/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
module.exports = withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "Front-End\node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "Front-End\node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        backGroundColor: "#f4f2ee",
      },
    },
  },
  plugins: [],
});
