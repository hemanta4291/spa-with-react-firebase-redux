/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
  "./src/**/*.{js,jsx}",],
  theme: {
    extend: {
      colors:{
        'primary-25': '#1fb6ff',
        'primary-600': '#1570ef',
        'gray-200': '#eaecf0',
        'info-50': '#ecfdff'
      }
    },
  },
  plugins: [],
}
