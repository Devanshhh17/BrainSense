function FuturisticInput({
  label,
  name,
  value,
  onChange,
  type = "number",
  helperText,
  min,
  max,
  step = "any"
}) {
  return (
    <label className="block space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm text-white/85">{label}</span>
        <span className="text-xs text-white/45">{helperText}</span>
      </div>
      <input
        type={type}
        name={name}
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={onChange}
        className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 outline-none focus:border-cyan-300/60 focus:ring-2 focus:ring-cyan-300/30 transition"
      />
    </label>
  );
}

export default FuturisticInput;
