/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        josefin: ['Josefin Sans', 'sans-serif'],
      },
      colors: {
        "theme-dark": {
          100: 'var(--very-dark-5)',
          75: 'var(--very-dark-4)',
          65: 'var(--very-dark-3)',
          50: 'var(--very-dark-2)',
          45: 'var(--very-dark-1)',
        },
        "theme-light": {
          100: 'var(--very-light-gray-5)',
          75: 'var(--very-light-gray-4)',
          65: 'var(--very-light-gray-3)',
          50: 'var(--very-light-gray-2)',
          45: 'var(--very-light-gray-1)',
        },
          "theme-gray": {
          100: 'var(--light-gray-blue)',
          75: 'var(--light-gray-blue-hover)',
        },
        primary: {
          light1: 'var(--very-light-gray-1)',
          light2: 'var(--very-light-gray-2)',
          light3: 'var(--very-light-gray-3)',
          light4: 'var(--very-light-gray-4)',
          light5: 'var(--very-light-gray-5)',


          dark1: 'var(--very-dark-5)',
          dark2: 'var(--very-dark-4)',
          dark3: 'var(--very-dark-3)',
          dark4: 'var(--very-dark-2)',
          dark5: 'var(--very-dark-1)',

          gray1:'var(--light-gray-blue)',
          gray2:'var(--light-gray-blue-hover)',
        },
      },
  },
  screens: {
    lg: { max: "1200px" },
    md: { max: "992px" },
    sm: { max: "768px" },
    xs: { max: "576px" },
    xxs: { max: "375px" },
},
  },
  plugins: [],
}