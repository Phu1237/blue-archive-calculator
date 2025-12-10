/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'ba-blue-primary': '#1289F4',
        'ba-blue-dark': '#0065a3',
        'ba-cyan': '#00D1FF',
        'ba-bg': '#F3F7F9',
        'ba-card-bg': 'rgba(255, 255, 255, 0.85)',
        'ba-text-main': '#2D3A4A',
        'ba-text-sub': '#6E7C8C',
        'ba-border': '#DAE3EA',
      },
      fontFamily: {
        'main': ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'sm': '0 2px 8px rgba(18, 137, 244, 0.05)',
        'md': '0 8px 16px rgba(18, 137, 244, 0.1)',
        'lg': '0 16px 32px rgba(18, 137, 244, 0.15)',
      },
      borderRadius: {
        'lg': '20px',
        'md': '12px',
        'sm': '8px',
      }
    },
  },
  plugins: [],
}

