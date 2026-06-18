import { motion } from "framer-motion";

function LoadingScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-bg">
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card rounded-2xl p-8 text-center"
      >
        <div className="h-12 w-12 mx-auto rounded-full border-2 border-cyan-300/40 border-t-cyan-300 animate-spin" />
        <p className="mt-4 text-white/75">Syncing neural insights...</p>
      </motion.div>
    </div>
  );
}

export default LoadingScreen;
