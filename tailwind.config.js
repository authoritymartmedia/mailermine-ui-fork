import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'bg-base': 'var(--bg-base)',
        'bg-elevated': 'var(--bg-elevated)',
        'bg-elevated-2': 'var(--bg-elevated-2)',
        'bg-active': 'var(--bg-active)',
        'bg-hover': 'var(--bg-hover)',
        'border-subtle': 'var(--border-subtle)',
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        'text-tertiary': 'var(--text-tertiary)',
        'accent-green': 'var(--accent-green)',
        'accent-red': 'var(--accent-red)',
        'accent-amber': 'var(--accent-amber)',
        'accent-blue': 'var(--accent-blue)',
      },
      boxShadow: {
        soft: 'var(--shadow-soft)',
        button: 'var(--shadow-button)',
      },
      borderRadius: {
        sm: '8px',
        md: '14px',
        lg: '20px',
        pill: '999px',
      },
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
        serif: ['Instrument Serif', 'Georgia', ...defaultTheme.fontFamily.serif],
        mono: ['JetBrains Mono', 'SF Mono', ...defaultTheme.fontFamily.mono],
      },
      spacing: {
        18: '4.5rem',
      },
    },
  },
  plugins: [forms],
};
