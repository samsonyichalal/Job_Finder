/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#4F46E5",
        secondary: "#7C3AED",
        success: "#10B981",
        warning: "#F59E0B",
        danger: "#F43F5E",
        surface: "#1E1B4B",
        background: "#0F0E1A",
        card: "#1A1730",
        border: "#2D2A4A",
        text: "#E2E8F0",
        muted: "#94A3B8"
      },
      borderRadius: {
        DEFAULT: "12px",
        "lg": "16px",
        "xl": "20px"
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"]
      }
    },
  },
  plugins: [],
}
