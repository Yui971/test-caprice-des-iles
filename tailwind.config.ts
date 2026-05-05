import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ocean: {
          50:  '#EBF9FF',
          100: '#C8F0FF',
          200: '#8EDCF5',
          300: '#45C4E8',
          400: '#1AADDA',
          500: '#0D90BE',
          600: '#0A7299',
          700: '#085470',
          800: '#053A4E',
          900: '#021E2B',
          950: '#010F17',
        },
        coral: {
          100: '#FEE9E5',
          200: '#FDC7BE',
          300: '#FA9A8C',
          400: '#F57362',
          500: '#E8503F',
          600: '#C73425',
          700: '#9A261B',
        },
        gold: {
          100: '#FFF8E0',
          200: '#FFEEA8',
          300: '#FFE070',
          400: '#F5CC40',
          500: '#D4A825',
          600: '#A8821A',
          700: '#7C600F',
        },
        palm: {
          100: '#E6F4EB',
          200: '#B8DECA',
          300: '#7CC4A0',
          400: '#4AAD7A',
          500: '#278F5C',
          600: '#1B7044',
          700: '#0F5030',
        },
        sand: {
          50:  '#FFFDF8',
          100: '#FFF9EE',
          200: '#FFF2D8',
          300: '#FEE9BE',
          400: '#FDDEA0',
          500: '#F9CE78',
        },
        night: {
          800: '#0E1C2C',
          900: '#070F1A',
          950: '#020810',
        },
      },
      fontFamily: {
        serif:  ['var(--font-playfair)', 'Georgia', 'serif'],
        sans:   ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #020D1C 0%, #0A2A3D 30%, #0D4A5A 60%, #1A3A2A 100%)',
        'card-gradient': 'linear-gradient(145deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)',
        'gold-shimmer': 'linear-gradient(90deg, #D4A825, #FFE070, #D4A825)',
      },
      animation: {
        'wave-slow':    'wave 8s ease-in-out infinite',
        'float':        'float 6s ease-in-out infinite',
        'float-delay':  'float 6s ease-in-out 2s infinite',
        'pulse-glow':   'pulseGlow 3s ease-in-out infinite',
        'shimmer':      'shimmer 3s linear infinite',
        'leaf-sway':    'leafSway 8s ease-in-out infinite',
      },
      keyframes: {
        wave: {
          '0%, 100%': { transform: 'translateX(0) scaleX(1)' },
          '50%':      { transform: 'translateX(-3%) scaleX(1.03)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%':      { transform: 'translateY(-16px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%':      { opacity: '1',   transform: 'scale(1.05)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        leafSway: {
          '0%, 100%': { transform: 'rotate(-3deg) translateX(0)' },
          '50%':      { transform: 'rotate(3deg) translateX(6px)' },
        },
      },
      backdropBlur: { xs: '2px' },
      boxShadow: {
        'card':       '0 4px 24px rgba(0,0,0,0.4), 0 1px 4px rgba(0,0,0,0.3)',
        'card-hover': '0 8px 40px rgba(0,0,0,0.5), 0 2px 8px rgba(0,0,0,0.4)',
        'glow-gold':  '0 0 30px rgba(212,168,37,0.35)',
        'glow-coral': '0 0 30px rgba(232,80,63,0.35)',
        'glow-teal':  '0 0 30px rgba(13,144,190,0.35)',
      },
    },
  },
  plugins: [],
};

export default config;
