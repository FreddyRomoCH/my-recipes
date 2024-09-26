/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        'boxes': 'repeat(auto-fit, minmax(250px, 1fr))'
      },
      animation: {
        'fade-out': 'fade-out 1.5s ease-out forwards',
        'slide-down': 'slide-down 0.3s ease-in-out forwards',
        'slide-up': 'slide-up 0.3s ease-in-out forwards',
      },
      keyframes: {
        'fade-out': {
          '0%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
          '75%': {
            opacity: '0.8',
          },
          '100%': {
            opacity: '0',
            transform: 'translateY(-2rem)',
          },
        }
      }
    },
  },
  plugins: [],
}

