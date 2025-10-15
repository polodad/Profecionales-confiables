import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#5D4037",
          foreground: "#FFFFFF",
          50: '#F5F5F5',
          100: '#D2B48C',
          200: '#D2B48C',
          300: '#D2B48C',
          400: '#D2B48C',
          500: '#5D4037',
          600: '#4A3329',
          700: '#3D291E',
          800: '#301F16',
          900: '#23150E',
          950: '#160B08',
        },
        orange: {
          DEFAULT: "#E87900",
          foreground: "#FFFFFF",
          50: '#FEF7ED',
          100: '#FDEDD3',
          200: '#FBD9A5',
          300: '#F8C273',
          400: '#F5A641',
          500: '#E87900',
          600: '#D16A00',
          700: '#BA5B00',
          800: '#A34C00',
          900: '#8C3D00',
        },
        beige: {
          DEFAULT: "#D2B48C",
          foreground: "#5D4037",
          50: '#F5F5F5',
          100: '#D2B48C',
          200: '#C4A484',
          300: '#B6937C',
          400: '#A88274',
          500: '#9A716C',
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [],
};
export default config;

