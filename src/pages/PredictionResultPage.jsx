import { motion } from "framer-motion";
import GlassCard from "../components/GlassCard";
import InsightCard from "../components/InsightCard";
import PredictionGauge from "../components/PredictionGauge";
import SectionWrapper from "../components/SectionWrapper";
import { awarenessTips, featureImportance, predictionSnapshot } from "../data/mockData";
import { confidenceLabel, riskTone } from "../utils/helpers";
import usePageTitle from "../hooks/usePageTitle";

function PredictionResultPage() {
  usePageTitle("Prediction");
  const { riskLevel, confidence, disclaimer } = predictionSnapshot;

  return (
    <SectionWrapper>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid xl:grid-cols-3 gap-5">
        <GlassCard className="xl:col-span-2 holo-panel">
          <h2 className="text-xl font-semibold">Risk Projection Result</h2>
          <div className="neon-divider mt-3" />
          <div className="flex flex-wrap items-center gap-3 mt-4">
            <span className={`px-3 py-1 text-sm rounded-full border ${riskTone(riskLevel)}`}>{riskLevel} Risk</span>
            <span className="text-sm text-white/70">Confidence label: {confidenceLabel(confidence)}</span>
          </div>
          <p className="text-sm text-white/70 mt-5">{disclaimer}</p>
        </GlassCard>

        <GlassCard className="holo-panel">
          <PredictionGauge value={confidence} />
        </GlassCard>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-5 mt-5">
        <GlassCard className="holo-panel">
          <h3 className="font-semibold mb-4">Top Contributing Features</h3>
          <div className="space-y-3">
            {featureImportance.map((feature) => (
              <div key={feature.name}>
                <div className="flex justify-between text-sm mb-1">
                  <span>{feature.name}</span>
                  <span className="text-cyan-300">{feature.impact}%</span>
                </div>
                <div className="h-2 rounded-full bg-white/10">
                  <div className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-purple-500" style={{ width: `${feature.impact}%` }} />
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
        <GlassCard className="holo-panel">
          <h3 className="font-semibold mb-4">Recommended Awareness Tips</h3>
          <ul className="space-y-3">
            {awarenessTips.map((tip) => (
              <li key={tip} className="text-sm text-white/75 rounded-lg border border-white/10 bg-white/5 p-3">
                {tip}
              </li>
            ))}
          </ul>
        </GlassCard>
      </div>

      <div className="grid md:grid-cols-3 gap-4 mt-5">
        <InsightCard title="Sleep-Centric Pattern" description="Sleep quality remains a major confidence booster for lower risk trajectories." />
        <InsightCard title="Stress Sensitivity" description="Stress fluctuations produce higher impact than raw screen-time duration in this profile." />
        <InsightCard title="Behavior Stability" description="Movement consistency and balanced typing rhythm improve model confidence outcomes." />
      </div>
    </SectionWrapper>
  );
}

export default PredictionResultPage;
