/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: "#FFC200",
          50: "#FFFDF0",
          100: "#FFF9D6",
          200: "#FFF0A3",
          300: "#FFE46B",
          400: "#FFD433",
          500: "#FFC200",
          600: "#CC9B00",
          700: "#997400",
          800: "#664E00",
          900: "#332700",
        },
        dark: {
          DEFAULT: "#1C140F",
          lighter: "#281D17",
          card: "#120D0A",
        },
        metallic: {
          DEFAULT: "#D7D8D7",
          light: "#EBECEB",
          dark: "#9E9E9E",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
      },
      boxShadow: {
        gold: "0 0 25px -5px rgba(255, 194, 0, 0.35)",
        "gold-lg": "0 0 45px -5px rgba(255, 194, 0, 0.5)",
        glass: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
      },
      animation: {
        "spin-slow": "spin 20s linear infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        scan: {
          "0%": { transform: "translateY(-100vh)" },
          "100%": { transform: "translateY(200vh)" },
        },
      },
    },
  },
  plugins: [],
};
