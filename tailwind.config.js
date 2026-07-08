/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        macaron: {
          pink: '#F2B5C8',
          lavender: '#C3B1E1',
          mint: '#B5EAD7',
          peach: '#FFDAC1',
          yellow: '#FFF5BA',
          blue: '#A8D8EA',
          cream: '#FEF9F2',
          brown: '#4A3728',
          rose: '#E8A0Bf',
          sage: '#A8C9B1',
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'hero-pattern': "url('/hero-bg.svg')",
      },
    },
  },
  plugins: [],
}
