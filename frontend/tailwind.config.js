/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],  // Ensure this is correct for your project
  theme: {
    extend: {
      colors: {
        primary: '#1d4ed8',
        secondary: '#f59e0b',
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      fontFamily: {
        sans: ['Graphik', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
      },
      borderRadius: {
        '4xl': '2rem',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),        // Add the forms plugin
    require('@tailwindcss/typography'),   // Add the typography plugin
  ],
};
