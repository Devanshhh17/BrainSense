import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function GlowButton({ children, to, onClick, type = "button", size = "md", className = "", variant = "primary", disabled = false }) {
  const sizes = {
    sm: "px-4 py-2 text-xs font-semibold",
    md: "px-5 py-2.5 text-sm font-semibold",
    lg: "px-7 py-3 text-sm font-semibold"
  };

  const hasBackgroundOverride = className.includes("bg-") || className.includes("!bg-");

  const variantClasses = variant === "primary" && !hasBackgroundOverride
    ? "bg-white text-black hover:bg-zinc-200"
    : "bg-white/[0.06] text-white border border-white/[0.08] hover:bg-white/[0.12]";

  const disabledClass = disabled ? "opacity-50 cursor-not-allowed pointer-events-none" : "cursor-pointer";

  const sharedClass = `inline-flex items-center justify-center rounded-full transition-all duration-200 tracking-tight ${sizes[size]} ${variantClasses} ${disabledClass} ${className}`;

  if (to && !disabled) {
    return (
      <motion.div whileHover={{ scale: 1.025 }} whileTap={{ scale: 0.975 }} className="inline-block">
        <Link to={to} className={sharedClass}>
          {children}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileHover={disabled ? {} : { scale: 1.025 }}
      whileTap={disabled ? {} : { scale: 0.975 }}
      className={sharedClass}
    >
      {children}
    </motion.button>
  );
}

export default GlowButton;
