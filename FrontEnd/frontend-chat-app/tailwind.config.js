/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors:{
        "primary-color": "#1476ff",
        "primary-light": "#f3f5ff",
        "light": "#f9faff",
      }, 
    },
  },
  plugins: [],
}
// npx tailwindcss init- This command has been run to create the tailwind.config.js file