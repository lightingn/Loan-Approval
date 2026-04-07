/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1A3C6E",
        secondary: "#2ECC8C",
        danger: "#E84545",
        accent: "#F5A623",
        background: "#F4F7FC",
        text: "#1C1C2E",
        muted: "#6B7A99",
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 4px 24px rgba(26,60,110,0.08)',
      }
    },
  },
  plugins: [],
}
