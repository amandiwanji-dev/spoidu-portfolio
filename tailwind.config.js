import plugin from 'tailwindcss/plugin';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  future: {
    // `hover:` styles only apply on devices that can actually hover.
    hoverOnlyWhenSupported: true,
  },
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#090909',
          900: '#090909',
          800: '#111111',
          700: '#171717',
        },
        fg: '#F5F5F5',
        muted: '#A1A1A1',
        faint: '#858585',
        line: '#292929',
        accent: '#C5FF4A',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        site: '1440px',
      },
      transitionTimingFunction: {
        film: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      keyframes: {
        marquee: {
          from: { transform: 'translate3d(0,0,0)' },
          to: { transform: 'translate3d(-50%,0,0)' },
        },
        scrollcue: {
          '0%': { transform: 'scaleY(0)', transformOrigin: 'top' },
          '45%': { transform: 'scaleY(1)', transformOrigin: 'top' },
          '55%': { transform: 'scaleY(1)', transformOrigin: 'bottom' },
          '100%': { transform: 'scaleY(0)', transformOrigin: 'bottom' },
        },
        pulsedot: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.35' },
        },
      },
      animation: {
        marquee: 'marquee 40s linear infinite',
        scrollcue: 'scrollcue 2.2s cubic-bezier(0.65,0,0.35,1) infinite',
        pulsedot: 'pulsedot 2s ease-in-out infinite',
      },
    },
  },
  plugins: [
    plugin(({ addVariant }) => {
      addVariant('can-hover', '@media (hover: hover) and (pointer: fine)');
      addVariant('no-hover', '@media (hover: none)');
    }),
  ],
};
