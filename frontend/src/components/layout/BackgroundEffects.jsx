import { motion } from "framer-motion";

function BackgroundEffects() {
  return (
    <>
      {/* Absolute background base */}
      <div className="fixed inset-0 pointer-events-none bg-hero-gradient -z-20" />
      <div className="fixed inset-0 pointer-events-none grid-overlay -z-10" />
      <div className="fixed inset-0 pointer-events-none noise-overlay -z-10" />

      {/* 1. Holographic AI Chip (Top Right) */}
      <motion.div
        className="fixed top-[-50px] right-[-100px] pointer-events-none text-white/5 opacity-[0.04] -z-10 select-none hidden md:block"
        animate={{
          y: [0, 8, 0],
          rotate: [0, 1.5, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <svg width="600" height="600" viewBox="0 0 400 400" fill="none" stroke="currentColor" strokeWidth="1">
          {/* Core chip body */}
          <rect x="120" y="120" width="160" height="160" rx="12" strokeDasharray="4 4" />
          <rect x="140" y="140" width="120" height="120" rx="8" />
          <rect x="170" y="170" width="60" height="60" rx="4" />
          
          {/* Pins radiating out */}
          {[...Array(8)].map((_, i) => {
            const offset = i * 20 + 130;
            return (
              <g key={i}>
                {/* Top pins */}
                <path d={`M ${offset} 120 L ${offset} 80`} />
                <circle cx={offset} cy="80" r="2" fill="currentColor" />
                {/* Bottom pins */}
                <path d={`M ${offset} 280 L ${offset} 320`} />
                <circle cx={offset} cy="320" r="2" fill="currentColor" />
                {/* Left pins */}
                <path d={`M 120 ${offset} L 80 ${offset}`} />
                <circle cx="80" cy={offset} r="2" fill="currentColor" />
                {/* Right pins */}
                <path d={`M 280 ${offset} L 320 ${offset}`} />
                <circle cx="320" cy={offset} r="2" fill="currentColor" />
              </g>
            );
          })}
          {/* Micro traces */}
          <path d="M 80 150 L 50 150 L 30 130" strokeDasharray="2 2" />
          <path d="M 320 250 L 350 250 L 370 270" strokeDasharray="2 2" />
          <path d="M 150 80 L 150 50 L 130 30" />
          <path d="M 250 320 L 250 350 L 270 370" />
        </svg>
      </motion.div>

      {/* 2. Neural Processor / Connective Nodes (Center Left) */}
      <motion.div
        className="fixed top-[25%] left-[-150px] pointer-events-none text-white/5 opacity-[0.03] -z-10 select-none hidden lg:block"
        animate={{
          y: [0, -10, 0],
          scale: [1, 1.02, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <svg width="600" height="600" viewBox="0 0 500 500" fill="none" stroke="currentColor" strokeWidth="1">
          {/* Neural nodes */}
          <circle cx="250" cy="250" r="6" fill="currentColor" />
          <circle cx="150" cy="180" r="4" />
          <circle cx="180" cy="320" r="4" />
          <circle cx="350" cy="150" r="5" />
          <circle cx="320" cy="300" r="4" fill="currentColor" />
          <circle cx="400" cy="240" r="4" />
          <circle cx="280" cy="120" r="3" />
          
          {/* Connections */}
          <path d="M 250 250 L 150 180" />
          <path d="M 250 250 L 180 320" />
          <path d="M 250 250 L 350 150" />
          <path d="M 250 250 L 320 300" />
          <path d="M 150 180 L 280 120" />
          <path d="M 350 150 L 280 120" />
          <path d="M 350 150 L 400 240" />
          <path d="M 320 300 L 400 240" />
          <path d="M 180 320 L 320 300" strokeDasharray="3 3" />
          <path d="M 150 180 L 180 320" />
          
          {/* Extra abstract signal waves */}
          <circle cx="250" cy="250" r="40" strokeDasharray="5 5" />
          <circle cx="250" cy="250" r="80" strokeDasharray="8 8" />
        </svg>
      </motion.div>

      {/* 3. Futuristic HUD / Concentric Coordinate Circle (Bottom Right) */}
      <motion.div
        className="fixed bottom-[-100px] right-[-100px] pointer-events-none text-white/5 opacity-[0.04] -z-10 select-none"
        animate={{
          rotate: 360
        }}
        transition={{
          duration: 45,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        <svg width="500" height="500" viewBox="0 0 400 400" fill="none" stroke="currentColor" strokeWidth="1">
          <circle cx="200" cy="200" r="180" strokeDasharray="10 5 2 5" />
          <circle cx="200" cy="200" r="150" strokeDasharray="4 8" />
          <circle cx="200" cy="200" r="120" />
          <circle cx="200" cy="200" r="50" strokeDasharray="20 40" />
          
          {/* Crosshairs & Lines */}
          <path d="M 20 200 L 380 200" strokeDasharray="4 4" />
          <path d="M 200 20 L 200 380" strokeDasharray="4 4" />
          
          {/* Markings */}
          <path d="M 200 30 L 205 30" />
          <path d="M 200 60 L 208 60" />
          <path d="M 200 90 L 205 90" />
          <path d="M 370 200 L 370 205" />
          <path d="M 340 200 L 340 208" />
        </svg>
      </motion.div>

      {/* 4. Floating 3D Geometric Shape / Wireframe Octahedron (Bottom Left) */}
      <motion.div
        className="fixed bottom-[15%] left-[5%] pointer-events-none text-white/5 opacity-[0.04] -z-10 select-none hidden sm:block"
        animate={{
          y: [0, -12, 0],
          rotateX: [0, 10, 0],
          rotateY: [0, 15, 0],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <svg width="250" height="250" viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="1">
          {/* Double pyramid wireframe (Octahedron) */}
          <polygon points="100,20 150,100 100,130 50,100" />
          <polygon points="100,180 150,100 100,130 50,100" />
          <line x1="100" y1="20" x2="100" y2="130" />
          <line x1="100" y1="180" x2="100" y2="130" />
          <line x1="50" y1="100" x2="150" y2="100" strokeDasharray="2 2" />
        </svg>
      </motion.div>

      {/* 5. Futuristic digital HUD device / layout panel (Top Center-Left) */}
      <motion.div
        className="fixed top-[8%] left-[25%] pointer-events-none text-white/5 opacity-[0.03] -z-10 select-none hidden xl:block"
        animate={{
          y: [0, 6, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <svg width="300" height="150" viewBox="0 0 300 150" fill="none" stroke="currentColor" strokeWidth="1">
          {/* HUD Status Box */}
          <rect x="10" y="10" width="280" height="130" rx="6" strokeDasharray="30 5 5 5" />
          <path d="M 20 40 L 280 40" strokeWidth="0.5" />
          <circle cx="30" cy="25" r="3" fill="currentColor" />
          <circle cx="45" cy="25" r="3" />
          <circle cx="60" cy="25" r="3" />
          <path d="M 230 20 L 270 20 M 270 20 L 270 30" />
          
          {/* Sublines */}
          <line x1="30" y1="60" x2="150" y2="60" />
          <line x1="30" y1="80" x2="200" y2="80" strokeDasharray="4 4" />
          <line x1="30" y1="100" x2="120" y2="100" />
          <rect x="230" y="60" width="40" height="40" strokeWidth="0.5" strokeDasharray="2 2" />
        </svg>
      </motion.div>
    </>
  );
}

export default BackgroundEffects;
