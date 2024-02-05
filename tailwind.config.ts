import type { Config } from 'tailwindcss'

const config: Config = {
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
    },
    colors: {
      "bg-color": "var(--bg-white)",
      "blue": "var(--main-blue-color)",
      "light-blue": "#6382B5",
      "red": "#FF2C2C",
      "white": "#FFFFFF",
      "gray": "#D0D0D0",
      "black": "#000000",
      "light-black": "242424",
      "silver": "#8E9190",
      "light-silver": "#DADEDD",
      "yellow": "#FFE812"
    }
  },
  plugins: [],
}
export default config
