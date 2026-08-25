/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24', // Electric Yellow-Gold
          500: '#f59e0b', // Radiant Amber
          600: '#ea580c', // Bright Orange
          700: '#c2410c', // Deep Orange
          800: '#9a3412',
          900: '#7c2d12',
          950: '#431407',
        },
        electric: {
          orange: '#FF6B00',
          yellow: '#FFD600',
          amber: '#F59E0B',
          gold: '#FBBF24',
          fire: '#EA580C',
          cyan: '#00F0FF',
        },
        dark: {
          base: '#0B0A08',
          surface: '#14120E',
          card: '#1C1914',
          border: '#29231B',
          hover: '#362F24'
        }
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 15px rgba(245, 158, 11, 0.4), 0 0 30px rgba(234, 88, 12, 0.2)' },
          '100%': { boxShadow: '0 0 25px rgba(245, 158, 11, 0.8), 0 0 50px rgba(234, 88, 12, 0.4)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        }
      }
    },
  },
  plugins: [],
}
