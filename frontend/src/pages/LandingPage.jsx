import { BrainCircuit, Lock, Sparkles, Telescope } from "lucide-react";
import { motion } from "framer-motion";
import GradientHeading from "../components/ui/GradientHeading";
import GlowButton from "../components/ui/GlowButton";
import FeatureCard from "../components/ui/FeatureCard";
import SectionWrapper from "../components/common/SectionWrapper";
import usePageTitle from "../hooks/usePageTitle";

const features = [
  { icon: Lock, title: "Privacy First", description: "Designed with minimal behavioral data and no invasive personal content." },
  { icon: BrainCircuit, title: "Explainable AI", description: "Clear feature importance insights support transparent interpretation." },
  { icon: Sparkles, title: "Minimal Data", description: "Uses routine smartphone interaction signals without heavy data collection." },
  { icon: Telescope, title: "Early Risk Awareness", description: "Provides proactive awareness indicators for potential cognitive strain." }
];

function LandingPage() {
  usePageTitle("Home");

  return (
    <div>
      <SectionWrapper className="py-24 min-h-[85vh] flex items-center">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <GradientHeading
              className="mt-1"
              title="BrainSense"
              subtitle="Minimal-Data Cognitive Risk Prediction using AI"
            />
            <p className="text-white/70 mt-6 max-w-xl">
              A futuristic intelligence layer that transforms subtle smartphone behavior patterns into early cognitive and mental wellness risk awareness.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <GlowButton to="/input" size="lg">Start Analysis</GlowButton>
              <GlowButton to="/about" size="lg" className="!bg-white/10 !shadow-none border border-white/20">
                Explore Research
              </GlowButton>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card holo-panel rounded-3xl p-8 animate-float"
          >
            <p className="text-sm uppercase tracking-widest text-cyan-300/80">Project Overview</p>
            <h3 className="text-2xl font-semibold mt-3">Minimal signals, meaningful foresight.</h3>
            <p className="mt-4 text-white/70 leading-relaxed">
              BrainSense demonstrates how lightweight usage, typing behavior, and wellness self-ratings can be synthesized into a polished AI risk projection dashboard for academic and research use.
            </p>
            <div className="neon-divider mt-6" />
            <p className="text-xs text-white/55 mt-4">Research-grade interface · privacy-preserving design · explainable outputs</p>
          </motion.div>
        </div>
      </SectionWrapper>

      <SectionWrapper className="pb-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </SectionWrapper>

      <footer className="border-t border-white/10 py-8 text-center text-sm text-white/55">
        <p>BrainSense Frontend Research Interface - Futuristic AI Presentation UI</p>
      </footer>
    </div>
  );
}

export default LandingPage;
