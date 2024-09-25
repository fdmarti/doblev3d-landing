/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  safelist: ['bg-red-500', 'bg-green-500'],
  theme: {
    extend: {},
  },
  plugins: [],
};
