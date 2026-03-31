function RangeSlider({ label, name, value, onChange, min = 0, max = 100 }) {
  return (
    <label className="block space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm text-white/85">{label}</span>
        <span className="text-sm text-cyan-300">{value}</span>
      </div>
      <input
        type="range"
        name={name}
        value={value}
        onChange={onChange}
        min={min}
        max={max}
        className="w-full accent-cyan-400"
      />
    </label>
  );
}

export default RangeSlider;
