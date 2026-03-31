function NeonBadge({ text }) {
  return (
    <span className="inline-flex items-center px-3 py-1 text-xs rounded-full border border-cyan-300/40 bg-cyan-400/10 text-cyan-200">
      {text}
    </span>
  );
}

export default NeonBadge;
