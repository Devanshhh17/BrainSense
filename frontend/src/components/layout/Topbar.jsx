import { Bell, Brain, Calendar, ChevronDown, Search } from "lucide-react";
import { useLocation } from "react-router-dom";

const titleMap = {
  "/dashboard": "AI Monitoring Dashboard",
  "/input": "Behavior Input Profile",
  "/results": "Prediction Results",
  "/history": "Historical Predictions"
};

function Topbar() {
  const { pathname } = useLocation();
  const routeBadge =
    pathname === "/dashboard"
      ? "Live Metrics"
      : pathname === "/input"
      ? "Signal Capture"
      : pathname === "/results"
      ? "Inference Layer"
      : "Timeline View";

  return (
    <header className="sticky top-0 z-20 h-16 px-6 border-b border-white/[0.08] backdrop-blur-xl bg-black/30 flex items-center justify-between gap-4 select-none shrink-0">
      
      {/* Workspace Dropdown and Search */}
      <div className="flex items-center gap-4 flex-1 max-w-lg">
        {/* Workspace Dropdown */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.05] cursor-pointer text-xs font-semibold text-zinc-300 transition duration-200">
          <span className="w-1.5 h-1.5 rounded-full bg-[#6EE7FF]" />
          <span>All Features</span>
          <ChevronDown size={12} className="text-zinc-500" />
        </div>

        {/* Search Field */}
        <div className="relative flex-1 hidden md:block">
          <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
          <input
            type="text"
            placeholder="Search metric logs..."
            className="w-full text-xs pl-9 pr-4 py-2 rounded-full border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] focus:bg-white/[0.05] focus:border-white/20 focus:ring-1 focus:ring-white/10 outline-none text-white transition duration-200"
            disabled
          />
        </div>
      </div>

      {/* Right Icons: Calendar, notifications, avatar */}
      <div className="flex items-center gap-3">
        <span className="hidden sm:inline-flex text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded-full border border-white/[0.08] bg-white/[0.04] text-zinc-300">
          {routeBadge}
        </span>
        
        {/* Calendar Icon */}
        <button type="button" className="p-2 rounded-full border border-white/[0.06] hover:border-white/20 bg-white/[0.02] text-zinc-400 hover:text-white transition duration-200">
          <Calendar size={14} />
        </button>

        {/* Notification Bell */}
        <button type="button" className="p-2 rounded-full border border-white/[0.06] hover:border-white/20 bg-white/[0.02] text-zinc-400 hover:text-white transition duration-200 relative">
          <Bell size={14} />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-[#6EE7FF]" />
        </button>

        <div className="w-[1px] h-6 bg-white/[0.08] mx-1" />

        {/* Avatar and Profile Dropdown */}
        <div className="flex items-center gap-1.5 cursor-pointer hover:opacity-85 transition">
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-zinc-500 to-zinc-800 border border-white/20 flex items-center justify-center text-[10px] font-bold text-white uppercase select-none">
            BS
          </div>
          <ChevronDown size={12} className="text-zinc-500" />
        </div>
      </div>
    </header>
  );
}

export default Topbar;
