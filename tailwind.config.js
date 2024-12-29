/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-primary-500': '#1882FF',
        'brand-dark-600': '#77818C',
        'brand-dark-700': '#5A6573',
        'brand-dark-900': '#1A2B3D',
      },
      fontWeight: {
        '475': '475',
        '575': '575',
      },
    },
  },
  plugins: [],
}
