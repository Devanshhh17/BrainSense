import { Link, NavLink, Outlet } from "react-router-dom";
import { Brain, Menu } from "lucide-react";
import { useState } from "react";
import BackgroundEffects from "./BackgroundEffects";
import GlowButton from "../ui/GlowButton";

function MainLayout() {
  const [open, setOpen] = useState(false);

  const navItems = [
    { to: "/", label: "Home" },
    { to: "/about", label: "Research" },
    { to: "/dashboard", label: "Dashboard" }
  ];

  return (
    <div className="min-h-screen bg-bg text-white relative overflow-x-hidden">
      <BackgroundEffects />
      <header className="sticky top-0 z-40 border-b border-white/10 backdrop-blur-xl bg-black/20">
        <nav className="mx-auto max-w-7xl px-4 sm:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-white/5 border border-cyan-300/40">
              <Brain className="h-5 w-5 text-cyan-300" />
            </span>
            <span className="font-semibold tracking-wide">BrainSense</span>
          </Link>
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `text-sm transition ${
                    isActive ? "text-cyan-300" : "text-white/70 hover:text-white"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
            <GlowButton to="/input" size="sm">
              Start Analysis
            </GlowButton>
          </div>
          <button
            type="button"
            className="md:hidden p-2 rounded-lg border border-white/20"
            onClick={() => setOpen((prev) => !prev)}
          >
            <Menu className="h-5 w-5" />
          </button>
        </nav>
        {open && (
          <div className="md:hidden px-4 pb-4 flex flex-col gap-2">
            {navItems.map((item) => (
              <NavLink key={item.to} to={item.to} className="glass-card px-3 py-2 rounded-lg">
                {item.label}
              </NavLink>
            ))}
          </div>
        )}
      </header>
      <Outlet />
    </div>
  );
}

export default MainLayout;
