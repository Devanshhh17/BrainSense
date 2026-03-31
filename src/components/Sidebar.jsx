import { Activity, BarChart3, FileClock, FlaskConical, Home, PenSquare } from "lucide-react";
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
    <aside className="hidden md:flex fixed left-0 top-0 z-30 h-screen w-72 p-4">
      <div className="glass-card w-full rounded-2xl p-4 flex flex-col">
        <div className="flex items-center gap-2 px-2 py-3 border-b border-white/10">
          <BarChart3 className="text-cyan-300" />
          <div>
            <h2 className="font-semibold">BrainSense</h2>
            <p className="text-xs text-white/60">Cognitive AI Console</p>
          </div>
        </div>
        <nav className="mt-4 space-y-2">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-lg border transition ${
                    isActive
                      ? "border-cyan-300/45 bg-cyan-400/10 text-cyan-200"
                      : "border-transparent text-white/75 hover:bg-white/5 hover:text-white"
                  }`
                }
              >
                <Icon size={18} />
                {link.label}
              </NavLink>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}

export default Sidebar;
