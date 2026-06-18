import GlassCard from "./GlassCard";

function FeatureCard({ icon: Icon, title, description }) {
  return (
    <GlassCard className="h-full flex flex-col justify-start">
      <div className="w-10 h-10 rounded-xl border border-white/10 bg-white/[0.04] flex items-center justify-center text-white">
        <Icon size={20} />
      </div>
      <h3 className="mt-4 font-semibold text-white tracking-tight">{title}</h3>
      <p className="text-sm text-[#A1A1AA] mt-2 leading-relaxed">{description}</p>
    </GlassCard>
  );
}

export default FeatureCard;
