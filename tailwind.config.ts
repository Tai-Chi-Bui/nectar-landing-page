import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        sidebar_background: "#18181B",
        background: "#131316", // bg for the whole page
        white: "#FFFFFF",
        red: {
          50: '#F43F3F', // button bg
          100: '#F43F3F', // section title
          150: '#C41E3A',
        },
        gray: {
          50: '#EFEFEF', // pic description
          75: '#C9C9C9',
          100: '#E2E9ED', // section header
          150: '#D7D7D7',
          200: '#D9D9D9', // voicer pic border
          300: '#ADADAD', // section description
          400: '#3B3B42', // selected category bg
          500: '#2C2C30', // icon bg / button bg / image option border
          600: '#26272B', // category bg
        },
      },
      fontSize: {
        base: '1rem',     // 16px
        xs: '0.75rem',       // 12px
        sm: '0.875rem',   // 14px
        md: '1.125rem',   // 18px
        lg: '1.5rem',     // 24px
        xl: '2rem',       // 32px
      },
    },
  },
  plugins: [],
} satisfies Config;
