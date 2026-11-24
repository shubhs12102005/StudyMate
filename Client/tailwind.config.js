/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        desk: {
          bg: 'var(--desk-bg)',
          card: 'var(--card-bg)',
          sub: 'var(--sub-bg)',
          ink: 'var(--ink-text)',
          muted: 'var(--muted-text)',
          border: 'var(--border-hairline)',
        },
        tangerine: {
          DEFAULT: '#FF6B35',
          hover: '#FA581C',
          light: '#FF8A5C',
          faint: 'var(--tangerine-faint)',
        },
        highlighter: {
          DEFAULT: '#FFD84D',
          hover: '#FFE066',
          faint: 'var(--highlighter-faint)',
        },
        violet: {
          DEFAULT: '#6D4AFF',
          hover: '#5B35F5',
          light: '#886BFF',
          faint: 'var(--violet-faint)',
        },
        mint: {
          DEFAULT: '#2EC4A0',
          hover: '#25A989',
          faint: 'var(--mint-faint)',
        },
        rose: {
          DEFAULT: '#E5484D',
          hover: '#D4373C',
          faint: 'var(--rose-faint)',
        },
        amber: {
          glow: '#F59E0B',
        }
      },
      fontFamily: {
        serif: ['Fraunces', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'desk-sm': 'var(--shadow-desk-sm)',
        'desk-md': 'var(--shadow-desk-md)',
        'desk-lg': 'var(--shadow-desk-lg)',
        'desk-card': 'var(--shadow-desk-card)',
        'desk-sticky': 'var(--shadow-desk-sticky)',
      },
      borderRadius: {
        'desk-sm': '10px',
        'desk': '16px',
        'desk-lg': '22px',
      },
      keyframes: {
        'marker-swipe': {
          '0%': { width: '0%' },
          '100%': { width: '100%' },
        },
        'spark-pulse': {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.4', transform: 'scale(0.85)' },
        },
      },
      animation: {
        'marker-swipe': 'marker-swipe 0.4s ease-out forwards',
        'spark-pulse': 'spark-pulse 1.8s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}
