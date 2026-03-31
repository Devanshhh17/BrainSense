import { Bell, Brain } from "lucide-react";
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
    <header className="sticky top-0 z-20 h-16 px-4 sm:px-8 border-b border-white/10 backdrop-blur-xl bg-black/20 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Brain className="text-cyan-300" size={20} />
        <div>
          <h1 className="text-sm sm:text-base font-semibold">{titleMap[pathname] || "BrainSense"}</h1>
          <p className="text-xs text-white/50">Minimal-Data Cognitive Risk Prediction using AI</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <span className="hidden sm:inline-flex text-xs px-2.5 py-1 rounded-full border border-cyan-300/35 bg-cyan-300/10 text-cyan-200">
          {routeBadge}
        </span>
        <button type="button" className="p-2 rounded-lg border border-white/15 hover:border-cyan-300/40">
          <Bell size={18} className="text-white/80" />
        </button>
      </div>
    </header>
  );
}

export default Topbar;
