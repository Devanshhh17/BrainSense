import { Activity, FileClock, FlaskConical, Home, PenSquare } from "lucide-react";
import { NavLink } from "react-router-dom";

const links = [
  { to: "/dashboard", label: "Dashboard", icon: Home },
  { to: "/input", label: "Input Form", icon: PenSquare },
  { to: "/results", label: "Prediction", icon: Activity },
  { to: "/history", label: "History", icon: FileClock },
  { to: "/about", label: "Research", icon: FlaskConical }
];

function Sidebar() {
  return (
    <aside className="hidden md:flex flex-col w-64 border-r border-white/[0.08] bg-[#0B0B0B]/60 p-5 shrink-0 z-20">
      <div className="flex items-center gap-2.5 px-2 py-3 border-b border-white/[0.06] mb-5">
        <svg className="text-[#6EE7FF] animate-pulse" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="3" fill="currentColor" />
          <path d="M12 8V3M12 16v5M8 12H3M16 12h5M9 9l-4-4M15 15l4 4M9 15l-4 4M15 9l4-4" strokeWidth="1.5" />
        </svg>
        <div>
          <h2 className="font-bold text-white text-sm tracking-tight">BrainSense</h2>
          <p className="text-[10px] uppercase tracking-wider text-zinc-500 font-semibold">AI Cognitive OS</p>
        </div>
      </div>
      <nav className="space-y-1.5 flex-1">
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 rounded-full border text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? "border-[#6EE7FF]/25 bg-[#6EE7FF]/12 text-[#6EE7FF] shadow-[0_0_15px_rgba(110,231,255,0.12)] font-semibold"
                    : "border-transparent text-zinc-400 hover:bg-white/[0.03] hover:text-white"
                }`
              }
            >
              <Icon size={16} />
              {link.label}
            </NavLink>
          );
        })}
      </nav>

      {/* Connected nodes neural network at the bottom */}
      <div className="pt-6 opacity-[0.04] pointer-events-none select-none text-white border-t border-white/[0.06] mt-auto">
        <p className="text-[9px] uppercase tracking-widest text-center mb-3 text-zinc-400">Neural Network Active</p>
        <svg width="100%" height="60" viewBox="0 0 200 60" fill="none" stroke="currentColor" strokeWidth="0.8">
          <circle cx="20" cy="30" r="2.5" fill="currentColor" />
          <circle cx="60" cy="15" r="2.5" fill="currentColor" />
          <circle cx="65" cy="45" r="2.5" fill="currentColor" />
          <circle cx="110" cy="20" r="2.5" fill="currentColor" />
          <circle cx="150" cy="40" r="2.5" fill="currentColor" />
          <circle cx="180" cy="15" r="2.5" fill="currentColor" />

          <line x1="20" y1="30" x2="60" y2="15" />
          <line x1="20" y1="30" x2="65" y2="45" />
          <line x1="60" y1="15" x2="110" y2="20" />
          <line x1="65" y1="45" x2="110" y2="20" />
          <line x1="110" y1="20" x2="150" y2="40" />
          <line x1="150" y1="40" x2="180" y2="15" />
          <line x1="110" y1="20" x2="180" y2="15" strokeDasharray="2 2" />
        </svg>
      </div>
    </aside>
  );}

export default Sidebar;
