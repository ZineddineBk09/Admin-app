/** @type {import('tailwindcss').Config} */
// const withMT = require('@material-tailwind/react/utils/withMT')

module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],

  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FFDB00',
          light: '#FFED83',
          500: '#FFDB00',
          600: '#FFDB00',
          700: '#FFDB00',
        },
      },
      // image background
      backgroundImage: (theme) => ({
        'login-bg': "url('/images/login-bg.png')",
        'chat-bg': "url('/images/chat-bg.png')",
      }),
    },
  },
  plugins: [],
}
