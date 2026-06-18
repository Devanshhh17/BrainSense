import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import BackgroundEffects from "./BackgroundEffects";
import LoadingScreen from "../common/LoadingScreen";
import { useEffect, useState } from "react";

function DashboardLayout() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const auraClass =
    location.pathname === "/results"
      ? "bg-purple-500/70 top-20 right-10"
      : location.pathname === "/history"
      ? "bg-blue-500/70 bottom-10 right-0"
      : "bg-cyan-400/70 top-24 left-[30%]";

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 550);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  if (loading) return <LoadingScreen />;

  return (
    <div className="min-h-screen bg-[#050505] text-white relative flex items-center justify-center p-4 md:p-8 overflow-hidden select-none">
      <BackgroundEffects />
      <div className={`route-aura ${auraClass}`} />

      {/* 3D Space Wrapper */}
      <div className="relative w-full max-w-[1440px] mx-auto flex items-center justify-center min-h-[90vh] py-6 perspective-[1500px]">
        
        {/* Left Panel (Blurred Mockup) */}
        <div 
          className="absolute left-[-8%] top-[10%] w-[50%] h-[75%] rounded-[24px] border border-white/[0.03] bg-[#0B0B0B]/30 backdrop-blur-md opacity-25 pointer-events-none select-none hidden xl:block shadow-2xl z-0"
          style={{
            transform: "rotateY(16deg) translateZ(-160px) translateX(-15%)",
            transformStyle: "preserve-3d"
          }}
        >
          {/* Inner mock content of left panel */}
          <div className="p-6 flex flex-col h-full gap-6">
            <div className="flex items-center gap-3 border-b border-white/[0.05] pb-4">
              <div className="w-8 h-8 rounded-full bg-white/5" />
              <div className="w-24 h-4 bg-white/10 rounded" />
            </div>
            <div className="w-full h-24 bg-white/[0.01] border border-white/[0.04] rounded-xl" />
            <div className="w-full h-32 bg-white/[0.01] border border-white/[0.04] rounded-xl" />
          </div>
        </div>

        {/* Right Panel (Blurred Mockup) */}
        <div 
          className="absolute right-[-8%] top-[10%] w-[50%] h-[75%] rounded-[24px] border border-white/[0.03] bg-[#0B0B0B]/30 backdrop-blur-md opacity-25 pointer-events-none select-none hidden xl:block shadow-2xl z-0"
          style={{
            transform: "rotateY(-16deg) translateZ(-160px) translateX(15%)",
            transformStyle: "preserve-3d"
          }}
        >
          {/* Inner mock content of right panel */}
          <div className="p-6 flex flex-col h-full gap-6">
            <div className="flex items-center justify-between border-b border-white/[0.05] pb-4">
              <div className="w-28 h-4 bg-white/10 rounded" />
              <div className="w-10 h-6 bg-white/5 rounded-full" />
            </div>
            <div className="w-full h-40 bg-white/[0.01] border border-white/[0.04] rounded-xl" />
            <div className="w-full h-16 bg-white/[0.01] border border-white/[0.04] rounded-xl" />
          </div>
        </div>

        {/* Center Panel (Interactive Main Dashboard) */}
        <div 
          className="relative w-full z-10 rounded-[24px] border border-white/[0.08] bg-[#0B0B0B]/85 backdrop-blur-2xl shadow-card flex overflow-hidden min-h-[85vh] transition-transform duration-500 ease-out"
          style={{
            transform: "translateZ(0px)",
            transformStyle: "preserve-3d"
          }}
        >
          <Sidebar />
          <main className="flex-1 flex flex-col overflow-hidden">
            <Topbar />
            <div className="p-4 sm:p-8 flex-1 overflow-y-auto select-text">
              <Outlet />
            </div>
          </main>
        </div>

      </div>
    </div>
  );
}

export default DashboardLayout;
