/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      height: {
        calc: 'calc(100dvh - 8px)'
      },
      boxShadow: {
        violet: '0px 5px 10px 2px rgba(185, 0, 255, 0.2)',
        bl: '0px 5px 10px -3px rgba(0, 0, 0, 0.2)',
      }
    },
  },
  plugins: [],
}
