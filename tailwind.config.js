/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        roobert: ['Roobert', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      animation: {
        text: 'text 7s ease infinite',
      },
      keyframes: {
        text: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center',
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center',
          },
        },
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            // Custom table styles
            table: {
              width: '100%',
              textAlign: 'left',
              borderCollapse: 'collapse',
              color: theme('colors.zinc.600'),
            },
            th: {
              borderBottomWidth: '1px',
              borderBottomColor: theme('colors.zinc.300'),
            },
            td: {
              borderBottomWidth: '1px',
              borderBottomColor: theme('colors.zinc.200'),
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
