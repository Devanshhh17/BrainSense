function GradientHeading({ title, subtitle, className = "" }) {
  return (
    <div className={className}>
      <h1 className="text-3xl sm:text-5xl font-bold gradient-text">{title}</h1>
      {subtitle && <p className="text-white/70 mt-3 max-w-3xl">{subtitle}</p>}
    </div>
  );
}

export default GradientHeading;
