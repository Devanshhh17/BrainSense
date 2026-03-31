import { motion } from "framer-motion";
import GlassCard from "./GlassCard";

function FeatureCard({ icon: Icon, title, description }) {
  return (
    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
      <GlassCard className="h-full">
        <div className="w-10 h-10 rounded-xl border border-cyan-300/40 bg-cyan-400/10 flex items-center justify-center text-cyan-300">
          <Icon size={20} />
        </div>
        <h3 className="mt-4 font-semibold">{title}</h3>
        <p className="text-sm text-white/70 mt-2 leading-relaxed">{description}</p>
      </GlassCard>
    </motion.div>
  );
}

export default FeatureCard;
