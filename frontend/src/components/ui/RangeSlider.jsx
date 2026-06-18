function RangeSlider({ label, name, value, onChange, min = 0, max = 100 }) {
  return (
    <label className="block space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm text-white/80 font-medium tracking-tight">{label}</span>
        <span className="text-sm text-white font-semibold">{value}</span>
      </div>
      <input
        type="range"
        name={name}
        value={value}
        onChange={onChange}
        min={min}
        max={max}
        className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-white"
      />
    </label>
  );
}

export default RangeSlider;
