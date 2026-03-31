import { motion } from "framer-motion";

function GlassCard({ children, className = "" }) {
  return (
    <motion.div
      whileHover={{ scale: 1.01, y: -2 }}
      transition={{ duration: 0.2 }}
      className={`glass-card rounded-2xl p-5 shadow-card ring-1 ring-white/5 hover:ring-cyan-300/25 transition ${className}`}
    >
      {children}
    </motion.div>
  );
}

export default GlassCard;
