/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#050505",
        secondary: "#0B0B0B",
        surface: "#0B0B0B",
        accent: "#6EE7FF",
        cyanGlow: "#6EE7FF",
        blueGlow: "#a1a1aa",
        purpleGlow: "#3f3f46"
      },
      boxShadow: {
        neon: "0 0 15px rgba(110, 231, 255, 0.15)",
        card: "0 25px 60px rgba(0, 0, 0, 0.95)",
        "neon-purple": "0 0 0px transparent"
      },
      backgroundImage: {
        "hero-gradient":
          "radial-gradient(circle at 50% 0%, #0B0B0B 0%, #050505 75%)",
        "neon-border":
          "linear-gradient(115deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02), rgba(255,255,255,0.06))"
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-6px)" }
        },
        pulseGlow: {
          "0%, 100%": { opacity: 0.4 },
          "50%": { opacity: 0.7 }
        },
        drift: {
          "0%": { transform: "translate3d(0, 0, 0)" },
          "50%": { transform: "translate3d(8px, -6px, 0)" },
          "100%": { transform: "translate3d(0, 0, 0)" }
        }
      },
      animation: {
        float: "float 16s ease-in-out infinite",
        pulseGlow: "pulseGlow 8s ease-in-out infinite",
        drift: "drift 20s ease-in-out infinite"
      }
    }
  },
  plugins: []
};
