export function riskTone(risk) {
  if (risk === "Low") return "text-emerald-300 border-emerald-400/40 bg-emerald-400/10";
  if (risk === "Moderate") return "text-cyan-300 border-cyan-400/40 bg-cyan-400/10";
  if (risk === "Elevated") return "text-amber-300 border-amber-400/40 bg-amber-400/10";
  return "text-rose-300 border-rose-400/40 bg-rose-400/10";
}

export function confidenceLabel(value) {
  if (value >= 90) return "Very High";
  if (value >= 80) return "High";
  if (value >= 70) return "Moderate";
  return "Needs Improvement";
}
