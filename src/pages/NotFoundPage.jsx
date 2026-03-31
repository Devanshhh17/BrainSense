import { Link } from "react-router-dom";
import { AlertTriangle } from "lucide-react";
import GlowButton from "../components/GlowButton";

function NotFoundPage() {
  return (
    <div className="min-h-screen bg-bg text-white flex items-center justify-center px-4">
      <div className="glass-card rounded-3xl p-10 text-center max-w-xl">
        <AlertTriangle className="mx-auto text-cyan-300" size={44} />
        <h1 className="mt-5 text-4xl font-bold gradient-text">404</h1>
        <p className="mt-2 text-white/70">Signal lost. This page drifted out of the neural grid.</p>
        <div className="mt-7">
          <GlowButton to="/">Return Home</GlowButton>
        </div>
        <p className="text-xs text-white/45 mt-4">
          or go directly to <Link to="/dashboard" className="text-cyan-300">dashboard</Link>
        </p>
      </div>
    </div>
  );
}

export default NotFoundPage;
