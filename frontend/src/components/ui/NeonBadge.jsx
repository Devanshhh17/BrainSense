function NeonBadge({ text }) {
  return (
    <span className="inline-flex items-center px-3 py-1 text-xs font-medium rounded-full border border-white/[0.08] bg-white/[0.04] text-zinc-300 tracking-tight">
      {text}
    </span>
  );
}

export default NeonBadge;
