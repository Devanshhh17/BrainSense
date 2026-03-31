import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function GlowButton({ children, to, onClick, type = "button", size = "md", className = "" }) {
  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-5 py-2.5 text-sm",
    lg: "px-7 py-3 text-base"
  };

  const sharedClass = `inline-flex items-center justify-center rounded-xl font-medium text-white 
    bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 shadow-neon hover:brightness-110 
    border border-cyan-300/35 transition duration-300 animate-pulseGlow ${sizes[size]} ${className}`;

  if (to) {
    return (
      <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
        <Link to={to} className={sharedClass}>
          {children}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      className={sharedClass}
    >
      {children}
    </motion.button>
  );
}

export default GlowButton;
