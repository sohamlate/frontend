/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bgDark: "#22223b",
        bgDark2: "#4a4e69",
      },
      screens: {
        'xs': '280px', // Custom breakpoint for extra small screens
        'xs1':'450px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
    },
    fontFamily: {
      poppins: ["Poppins", "sans-serif"],
      roboto: ["Roboto", "sans-serif"],
        "roboto-condensed": ["Roboto Condensed", "sans-serif"],
        "roboto-slab": ["Roboto Slab", "serif"],
    },
  },
  plugins: [],
};

