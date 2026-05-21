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
      transitionTimingFunction: {
        premium: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      transitionDuration: {
        350: '350ms',
      },
      boxShadow: {
        glow: '0 0 60px -15px rgba(91, 33, 182, 0.28)',
        'glow-purple': '0 8px 32px rgba(109, 94, 243, 0.18)',
        'glow-hub': '0 0 48px -8px rgba(109, 94, 243, 0.4)',
        card: '0 2px 16px -4px rgba(15, 23, 42, 0.06), 0 0 1px rgba(15, 23, 42, 0.04)',
        'card-hover': '0 8px 28px -8px rgba(15, 23, 42, 0.08), 0 0 1px rgba(15, 23, 42, 0.05)',
        soft: '0 1px 3px rgba(15, 23, 42, 0.04), 0 4px 20px -6px rgba(15, 23, 42, 0.06)',
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
