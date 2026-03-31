/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#05070f",
        cyanGlow: "#2dd4ff",
        blueGlow: "#4f46e5",
        purpleGlow: "#a855f7"
      },
      boxShadow: {
        neon: "0 0 20px rgba(45, 212, 255, 0.35)",
        card: "0 10px 35px rgba(0, 0, 0, 0.35)",
        "neon-purple": "0 0 26px rgba(168, 85, 247, 0.42)"
      },
      backgroundImage: {
        "hero-gradient":
          "radial-gradient(circle at 20% 10%, rgba(45, 212, 255, 0.2), transparent 45%), radial-gradient(circle at 80% 0%, rgba(168, 85, 247, 0.2), transparent 35%), linear-gradient(135deg, #05070f 0%, #080b1a 50%, #05070f 100%)",
        "neon-border":
          "linear-gradient(115deg, rgba(45,212,255,0.65), rgba(96,165,250,0.45), rgba(168,85,247,0.55))"
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" }
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 16px rgba(45, 212, 255, 0.2)" },
          "50%": { boxShadow: "0 0 28px rgba(45, 212, 255, 0.45)" }
        },
        drift: {
          "0%": { transform: "translate3d(0, 0, 0)" },
          "50%": { transform: "translate3d(16px, -12px, 0)" },
          "100%": { transform: "translate3d(0, 0, 0)" }
        }
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        pulseGlow: "pulseGlow 3s ease-in-out infinite",
        drift: "drift 10s ease-in-out infinite"
      }
    }
  },
  plugins: []
};
