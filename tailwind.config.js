/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          dark: '#0F0A1F',
          primary: '#6D5EF3',
          glow: '#8B7CFF',
          tint: '#F4F2FF',
        },
      },
      boxShadow: {
        glow: '0 0 60px -15px rgba(91, 33, 182, 0.35)',
        'glow-purple': '0 10px 40px rgba(109, 94, 243, 0.25)',
        'glow-hub': '0 0 48px -8px rgba(109, 94, 243, 0.55)',
        card: '0 4px 24px -4px rgba(15, 23, 42, 0.08), 0 0 1px rgba(15, 23, 42, 0.06)',
        'card-hover': '0 12px 40px -8px rgba(15, 23, 42, 0.12), 0 0 1px rgba(15, 23, 42, 0.08)',
      },
      animation: {
        'gradient-shift': 'gradientShift 14s ease-in-out infinite',
        'flow-pulse': 'flowPulse 3s ease-in-out infinite',
      },
      keyframes: {
        gradientShift: {
          '0%, 100%': { opacity: '0.35', transform: 'translateX(-8%) scale(1.05)' },
          '50%': { opacity: '0.55', transform: 'translateX(8%) scale(1.08)' },
        },
        flowPulse: {
          '0%, 100%': { opacity: '0.35', transform: 'scaleX(1)' },
          '50%': { opacity: '0.85', transform: 'scaleX(1.02)' },
        },
      },
    },
  },
  plugins: [],
};
