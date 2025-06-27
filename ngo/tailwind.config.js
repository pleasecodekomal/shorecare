/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Scan all your source files for Tailwind classes
  ],
  theme: {
    extend: {
      // Your custom styles here
    },
  },
  plugins: [],
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
  extend: {
    keyframes: {
      fadeSlideUp: {
        '0%': { opacity: '0', transform: 'translateY(20px)' },
        '100%': { opacity: '1', transform: 'translateY(0)' },
      },
    },
    animation: {
      fadeSlideUp: 'fadeSlideUp 1.5s ease-out forwards',
    },
  },

  },
  plugins: [],


}
