import GlassCard from "../ui/GlassCard";

function InsightCard({ title, description }) {
  return (
    <GlassCard className="h-full">
      <h3 className="font-semibold">{title}</h3>
      <p className="text-sm text-white/70 mt-2 leading-relaxed">{description}</p>
    </GlassCard>
  );
}

export default InsightCard;
