import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import BackgroundEffects from "../components/BackgroundEffects";
import LoadingScreen from "../components/LoadingScreen";
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
    <div className="min-h-screen bg-bg text-white relative">
      <BackgroundEffects />
      <div className={`route-aura ${auraClass}`} />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 md:ml-72">
          <Topbar />
          <div className="p-4 sm:p-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
