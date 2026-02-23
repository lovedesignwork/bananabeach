import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#0A0F1E',
          light: '#141929',
        },
        aqua: {
          DEFAULT: '#00D4C8',
          light: '#4DFFE8',
          dark: '#00A89E',
        },
        fire: {
          DEFAULT: '#FF4D00',
          light: '#FF6B2B',
          dark: '#CC3D00',
        },
        lime: {
          DEFAULT: '#CCFF00',
          dark: '#A8D400',
        },
        sand: '#F5F0E8',
        primary: {
          DEFAULT: '#00D4C8',
          dark: '#00A89E',
          light: '#4DFFE8',
        },
        accent: {
          DEFAULT: '#FF4D00',
          dark: '#CC3D00',
          light: '#FF6B2B',
        },
        foreground: {
          DEFAULT: '#0A0F1E',
          muted: '#6B7280',
        },
      },
      fontFamily: {
        heading: ['var(--font-heading)', 'sans-serif'],
        inter: ['var(--font-inter)', 'sans-serif'],
      },
      fontSize: {
        'display': ['clamp(3rem, 10vw, 9rem)', { lineHeight: '0.9', letterSpacing: '-0.03em' }],
        'display-sm': ['clamp(2rem, 6vw, 5rem)', { lineHeight: '0.95', letterSpacing: '-0.02em' }],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'count-up': 'slideUp 0.8s ease-out',
      },
      keyframes: {
        fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        slideUp: { '0%': { opacity: '0', transform: 'translateY(30px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
      },
    },
  },
  plugins: [],
};

export default config;
