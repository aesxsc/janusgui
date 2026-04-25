/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: '#1a1d23',
          secondary: '#20242c',
          card: '#252932',
          hover: '#2d3340',
          active: '#2a3a5c',
        },
        accent: {
          blue: '#3b6fd4',
          'blue-hover': '#4a7ee3',
          'blue-light': '#5b8ef4',
        },
        border: {
          DEFAULT: '#2d3340',
          light: '#363c4a',
        },
        text: {
          primary: '#e2e8f0',
          secondary: '#8892a4',
          muted: '#5a6375',
        },
      },
    },
  },
  plugins: [],
}
