import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import GlassCard from "../components/ui/GlassCard";
import InsightCard from "../components/features/InsightCard";
import PredictionGauge from "../components/features/PredictionGauge";
import SectionWrapper from "../components/common/SectionWrapper";
import { awarenessTips } from "../constants/mockData";
import { confidenceLabel, riskTone } from "../utils/helpers";
import usePageTitle from "../hooks/usePageTitle";
import GlowButton from "../components/ui/GlowButton";

function PredictionResultPage() {
  usePageTitle("Prediction");
  const navigate = useNavigate();
  const location = useLocation();

  const storedPrediction = typeof window !== "undefined" ? sessionStorage.getItem("lastPrediction") : null;
  const savedState = location.state?.prediction || (storedPrediction ? JSON.parse(storedPrediction)?.prediction : null);
  const prediction = savedState || null;

  if (!prediction) {
    return (
      <SectionWrapper>
        <GlassCard className="text-center py-20">
          <h2 className="text-xl font-semibold mb-3">No prediction data found</h2>
          <p className="text-sm text-white/60 mb-6">Submit a new prediction from the input form to connect with the backend.</p>
          <GlowButton
            onClick={() => navigate("/input")}
            size="md"
          >
            Go to Input Form
          </GlowButton>
        </GlassCard>
      </SectionWrapper>
    );
  }

  const { risk_level, confidence_score, disclaimer, recommendation, top_contributing_features = [] } = prediction;

  return (
    <SectionWrapper>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid xl:grid-cols-3 gap-5">
        <GlassCard className="xl:col-span-2 holo-panel">
          <h2 className="text-xl font-semibold">Risk Projection Result</h2>
          <div className="neon-divider mt-3" />
          <div className="flex flex-wrap items-center gap-3 mt-4">
            <span className={`px-3 py-1 text-sm rounded-full border ${riskTone(risk_level)}`}>{risk_level} Risk</span>
            <span className="text-sm text-white/70">Confidence label: {confidenceLabel(confidence_score)}</span>
          </div>
          <p className="text-sm text-white/70 mt-5">{disclaimer}</p>
        </GlassCard>

        <GlassCard className="holo-panel">
          <PredictionGauge value={confidence_score} />
        </GlassCard>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-5 mt-5">
        <GlassCard className="holo-panel">
          <h3 className="font-semibold mb-4">Top Contributing Features</h3>
          <div className="space-y-3">
            {top_contributing_features.map((feature, index) => (
              <div key={`${feature.feature}-${index}`}>
                <div className="flex justify-between text-sm mb-1">
                  <span>{feature.feature}</span>
                  <span className="text-white font-medium">{feature.impact}</span>
                </div>
                <div className="h-2 rounded-full bg-white/10">
                  <div className="h-full rounded-full bg-gradient-to-r from-white to-zinc-500" style={{ width: `${Math.min(Number(feature.impact), 100)}%` }} />
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
        <GlassCard className="holo-panel">
          <h3 className="font-semibold mb-4">Model Recommendation</h3>
          <p className="text-sm text-white/70">{recommendation}</p>
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
