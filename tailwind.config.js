/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
      },
      colors: {
        'brand': {
          50: '#eff6ff',
          100: '#dbeafe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        },
        'accent': {
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
        }
      },
      fontSize: {
        'hero': ['3rem', { lineHeight: '1.1', fontWeight: '700' }],
        'subhero': ['1.5rem', { lineHeight: '1.4', fontWeight: '500' }],
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
      },
      animation: {
        'fade-in': 'fadeIn 700ms ease-out both',
        'fade-in-up': 'fadeInUp 700ms ease-out both',
        'fade-in-up-100': 'fadeInUp 700ms ease-out 100ms both',
        'fade-in-up-200': 'fadeInUp 700ms ease-out 200ms both',
        'fade-in-up-300': 'fadeInUp 700ms ease-out 300ms both',
        'fade-in-up-400': 'fadeInUp 700ms ease-out 400ms both',
        'float': 'float 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
