import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: { deep: "#071827", mid: "#0D2438" },
        electric: "#18B8E8",
        sky: "#7DE4FF",
        gold: "#F5C85B",
        cream: "#F7F4EA",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["'Playfair Display'", "Georgia", "serif"],
      },
      animation: {
        "fade-in": "fadeIn .5s ease-out both",
        "fade-up": "fadeUp .6s ease-out both",
        shimmer: "shimmer 2.5s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%,100%": { opacity: ".4" },
          "50%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
