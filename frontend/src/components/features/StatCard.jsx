import GlassCard from "../ui/GlassCard";

function StatCard({ label, value, change }) {
  return (
    <GlassCard className="space-y-2">
      <p className="text-xs uppercase tracking-wider text-white/55">{label}</p>
      <p className="text-2xl font-semibold">{value}</p>
      <p className="text-xs text-cyan-300">{change} vs last cycle</p>
    </GlassCard>
  );
}

export default StatCard;
