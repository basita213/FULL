import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        pink: {
          DEFAULT: '#E91E8C',
          light: '#FFB6D9',
          pale: '#FFF0F7',
          deep: '#C41076',
        },
        dark: {
          DEFAULT: '#1A0A14',
          soft: '#2D1B24',
        },
        candy: {
          yellow: '#FFD93D',
          purple: '#B96BDB',
          red: '#FF4D6D',
          green: '#4ECDC4',
        },
      },
      fontFamily: {
        display: ['Fredoka', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        script: ['Sacramento', 'cursive'],
      },
      borderRadius: {
        '4xl': '32px',
        '5xl': '48px',
      },
    },
  },
  plugins: [],
};

export default config;
