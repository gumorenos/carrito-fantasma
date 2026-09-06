import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ghost: {
          ink: '#17232d',
          muted: '#5b6772',
          mist: '#f3f5f7',
          surface: '#fffefa',
          mint: '#ddf4ea',
          mintStrong: '#b8e3d1',
          teal: '#126f65',
          tealDark: '#0b514b',
          coral: '#c84f36',
          coralSoft: '#ffebe4',
          sand: '#fff0b8',
          sun: '#ffd84d',
          sunStrong: '#f5bf21',
          sunSoft: '#fff7d1',
          plum: '#163c50',
          plumDark: '#0d2837',
          violet: '#8c5bb2',
          sky: '#dff1f8',
          line: '#e1e6eb',
        },
      },
      boxShadow: {
        soft: '0 18px 46px rgba(60, 42, 55, 0.12)',
        card: '0 6px 18px rgba(60, 42, 55, 0.08)',
        market: '0 3px 12px rgba(60, 42, 55, 0.10)',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config
