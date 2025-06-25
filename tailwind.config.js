/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: '#374151',
            lineHeight: '1.75',
            fontSize: '1.125rem',
            h2: {
              fontSize: '1.875rem',
              fontWeight: '700',
              marginTop: '2rem',
              marginBottom: '1rem',
              color: '#111827',
            },
            h3: {
              fontSize: '1.5rem',
              fontWeight: '600',
              marginTop: '1.5rem',
              marginBottom: '0.75rem',
              color: '#111827',
            },
            p: {
              marginBottom: '1.5rem',
            },
            a: {
              color: '#2563eb',
              textDecoration: 'none',
              '&:hover': {
                color: '#1d4ed8',
                textDecoration: 'underline',
              },
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}