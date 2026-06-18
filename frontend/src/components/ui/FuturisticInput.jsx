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
        <span className="text-sm text-white/80 font-medium tracking-tight">{label}</span>
        <span className="text-xs text-[#A1A1AA]">{helperText}</span>
      </div>
      <input
        id={name}
        type={type}
        inputMode={type === "number" ? "decimal" : undefined}
        pattern={type === "number" ? "[0-9]*" : undefined}
        name={name}
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={onChange}
        className="w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-2.5 text-sm text-white outline-none focus:border-white/30 focus:ring-1 focus:ring-white/10 transition duration-200"
      />
    </label>
  );
}

export default FuturisticInput;
