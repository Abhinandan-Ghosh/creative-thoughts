/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: "Poppins"
      },
    },
  },
  plugins: [],
}
// module.exports = {
//   mode: 'jit',
//   content: ['./src/**/*.{js,ts,jsx,tsx,html,css}'],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// };
