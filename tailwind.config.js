/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {},
    screens: {
      xs: "320px",
      sm: "640px",
      md: "768px",
      mdx: "860px",
      lg: "1024px",
      xl: "1280px",
    },
  },
};
