import { motion } from "framer-motion";

function GlassCard({ children, className = "" }) {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className={`glass-card rounded-[24px] p-6 shadow-card border border-white/[0.08] hover:border-white/[0.16] transition-all duration-300 ${className}`}
    >
      {children}
    </motion.div>
  );
}

export default GlassCard;
