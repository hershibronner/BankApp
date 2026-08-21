import type { Config } from 'tailwindcss'
import animate from 'tailwindcss-animate'

/**
 * Every colour resolves to a CSS variable defined in globals.css, so the light
 * theme is a variable swap rather than a second set of utility classes.
 */
const config: Config = {
  darkMode: ['class', '[data-theme="dark"]'],
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        canvas: 'var(--canvas)',
        surface: {
          DEFAULT: 'var(--surface)',
          hover: 'var(--surface-hover)',
        },
        hairline: 'var(--border)',
        content: {
          DEFAULT: 'var(--text)',
          dim: 'var(--text-dim)',
          faint: 'var(--text-faint)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          contrast: 'var(--accent-contrast)',
        },
        positive: 'var(--positive)',
        warn: 'var(--warn)',
        negative: 'var(--negative)',
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      fontSize: {
        // The scale from the spec: 12 / 14 / 16 / 20 / 28 / 40 / 64.
        xs: ['0.75rem', { lineHeight: '1.1rem' }],
        sm: ['0.875rem', { lineHeight: '1.35rem' }],
        base: ['1rem', { lineHeight: '1.55rem' }],
        lg: ['1.25rem', { lineHeight: '1.7rem' }],
        xl: ['1.75rem', { lineHeight: '1.15', letterSpacing: '-0.02em' }],
        '2xl': ['2.5rem', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        '3xl': ['4rem', { lineHeight: '1.02', letterSpacing: '-0.025em' }],
      },
      borderRadius: {
        card: '8px',
        control: '6px',
      },
      transitionDuration: {
        DEFAULT: '150ms',
      },
      transitionTimingFunction: {
        DEFAULT: 'cubic-bezier(0, 0, 0.2, 1)',
      },
      keyframes: {
        'runway-in': {
          from: { transform: 'scaleX(0)' },
          to: { transform: 'scaleX(1)' },
        },
      },
      animation: {
        'runway-in': 'runway-in 400ms cubic-bezier(0, 0, 0.2, 1) both',
      },
    },
  },
  plugins: [animate],
}

export default config
