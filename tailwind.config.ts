import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
        // Theme-based colors
        'theme-primary': {
          50: 'rgb(var(--theme-primary-50))',
          100: 'rgb(var(--theme-primary-100))',
          200: 'rgb(var(--theme-primary-200))',
          300: 'rgb(var(--theme-primary-300))',
          400: 'rgb(var(--theme-primary-400))',
          500: 'rgb(var(--theme-primary-500))',
          600: 'rgb(var(--theme-primary-600))',
          700: 'rgb(var(--theme-primary-700))',
        },
        'theme-secondary': {
          50: 'rgb(var(--theme-secondary-50))',
          100: 'rgb(var(--theme-secondary-100))',
          200: 'rgb(var(--theme-secondary-200))',
          300: 'rgb(var(--theme-secondary-300))',
          400: 'rgb(var(--theme-secondary-400))',
          500: 'rgb(var(--theme-secondary-500))',
          600: 'rgb(var(--theme-secondary-600))',
          700: 'rgb(var(--theme-secondary-700))',
        },
        'theme-accent': {
          50: 'rgb(var(--theme-accent-50))',
          100: 'rgb(var(--theme-accent-100))',
          200: 'rgb(var(--theme-accent-200))',
          300: 'rgb(var(--theme-accent-300))',
          400: 'rgb(var(--theme-accent-400))',
          500: 'rgb(var(--theme-accent-500))',
          600: 'rgb(var(--theme-accent-600))',
          700: 'rgb(var(--theme-accent-700))',
        },
        'theme-success': {
          50: 'rgb(var(--theme-success-50))',
          100: 'rgb(var(--theme-success-100))',
          200: 'rgb(var(--theme-success-200))',
          500: 'rgb(var(--theme-success-500))',
          600: 'rgb(var(--theme-success-600))',
          700: 'rgb(var(--theme-success-700))',
        },
        'theme-warning': {
          200: 'rgb(var(--theme-warning-200))',
          500: 'rgb(var(--theme-warning-500))',
          600: 'rgb(var(--theme-warning-600))',
        },
        'theme-error': {
          100: 'rgb(var(--theme-error-100))',
          500: 'rgb(var(--theme-error-500))',
          600: 'rgb(var(--theme-error-600))',
        },
        'theme-indigo': {
          600: 'rgb(var(--theme-indigo-600))',
        },
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
export default config;
