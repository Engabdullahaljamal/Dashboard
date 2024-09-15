/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,jsx}"],
  darkMode: "selector",
  theme: {

    extend: {
      gap: {
        '100': '25.5rem',
         '55vh':'55vh',
      },
      padding: {
        '18%': '18%',
       '25%':'25%'
      },
      margin:{
        '70vh':'70vh',
        '18%':'18%'
      },
      width:{
        '16%':'16%',
     
      }
    },
  },
  plugins: [],
}

