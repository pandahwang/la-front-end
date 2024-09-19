/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        "scale-up-br": {
          "0%": { transform: "scale(0.5)", transformOrigin: "100% 100%" },
          "100%": { transform: "scale(1)", transformOrigin: "100% 100%" },
        },
      },
      animation: {
        "scale-up-br":
          "scale-up-br 0.4s cubic-bezier(0.390, 0.575, 0.565, 1.000) both",
      },
    },
  },
  plugins: [],
  safelist: [
    {
      pattern: /^bg-/,
    },
  ],
};
