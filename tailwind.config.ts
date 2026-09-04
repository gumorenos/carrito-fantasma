import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ghost: {
          ink: '#17332f',
          muted: '#607570',
          mist: '#f1faf7',
          mint: '#d9f3e9',
          mintStrong: '#b7e5d2',
          teal: '#16796d',
          tealDark: '#0f5b54',
          coral: '#e97857',
          coralSoft: '#fff0e8',
          sand: '#fff7df',
          line: '#dbe9e4',
        },
      },
      boxShadow: {
        soft: '0 20px 60px rgba(23, 51, 47, 0.12)',
        card: '0 10px 28px rgba(23, 51, 47, 0.08)',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config
