import { motion } from "framer-motion";

function SectionWrapper({ children, className = "" }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className={`mx-auto max-w-7xl px-4 sm:px-8 ${className}`}
    >
      {children}
    </motion.section>
  );
}

export default SectionWrapper;
