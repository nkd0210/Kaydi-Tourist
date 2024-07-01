/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "laptop": "url(/laptop.jpg)",
        "girlCamera": "url(/girlCamera.jpg)",
        "BoyCamera": "url(/boyCamera.jpg)",

      }
    },
  },
  plugins: [],
}