import aspectRatio from '@tailwindcss/aspect-ratio';
import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [daisyui, aspectRatio],
  daisyui: {
    themes: ["light", "dark", "cupcake"],
  },
}

