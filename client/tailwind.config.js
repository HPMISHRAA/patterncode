/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Support toggling dark mode via class
  theme: {
    extend: {
      colors: {
        obsidian: {
          50: '#f5f5f7',
          100: '#e8e8ed',
          200: '#d2d2db',
          300: '#aeaebe',
          400: '#85859d',
          500: '#64647f',
          600: '#4e4e68',
          700: '#3f3f56',
          800: '#1a1a24',
          900: '#0a0a0f',
          950: '#050507'
        },
        gold: {
          50: '#fefdf4',
          100: '#fdfae5',
          200: '#faf2be',
          300: '#f5e489',
          400: '#ebd14c',
          500: '#e5c158', // Champagne Gold accent
          600: '#cfa23b',
          700: '#ad7e2b',
          800: '#8f6327',
          900: '#754f22',
          950: '#432b10'
        }
      },
      fontFamily: {
        sans: ['Inter', 'Outfit', 'sans-serif'],
        mono: ['Fira Code', 'JetBrains Mono', 'monospace']
      }
    },
  },
  plugins: [],
}
