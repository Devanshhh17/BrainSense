import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Area,
  AreaChart
} from "recharts";
import GlassCard from "../components/GlassCard";
import StatCard from "../components/StatCard";
import SectionWrapper from "../components/SectionWrapper";
import { dashboardStats, recentPredictions, riskHistory, screenTimeTrend, stressTrend } from "../data/mockData";
import usePageTitle from "../hooks/usePageTitle";

function DashboardPage() {
  usePageTitle("Dashboard");

  return (
    <SectionWrapper>
      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {dashboardStats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>

      <div className="grid xl:grid-cols-2 gap-5 mt-6">
        <GlassCard className="holo-panel">
          <h3 className="font-semibold mb-4">Screen Time Trend</h3>
          <div className="neon-divider mb-4" />
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={screenTimeTrend}>
                <CartesianGrid stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="day" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip contentStyle={{ background: "#0f172a", border: "1px solid rgba(255,255,255,0.1)" }} />
                <Line type="monotone" dataKey="value" stroke="#2dd4ff" strokeWidth={2.5} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        <GlassCard className="holo-panel">
          <h3 className="font-semibold mb-4">Stress & Fatigue Trend</h3>
          <div className="neon-divider mb-4" />
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={stressTrend}>
                <CartesianGrid stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="week" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip contentStyle={{ background: "#0f172a", border: "1px solid rgba(255,255,255,0.1)" }} />
                <Line type="monotone" dataKey="stress" stroke="#a855f7" strokeWidth={2.5} />
                <Line type="monotone" dataKey="fatigue" stroke="#60a5fa" strokeWidth={2.5} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>
      </div>

      <div className="grid xl:grid-cols-3 gap-5 mt-6">
        <GlassCard className="xl:col-span-2 holo-panel">
          <h3 className="font-semibold mb-4">Risk History</h3>
          <div className="neon-divider mb-4" />
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={riskHistory}>
                <CartesianGrid stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="name" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip contentStyle={{ background: "#0f172a", border: "1px solid rgba(255,255,255,0.1)" }} />
                <Area type="monotone" dataKey="risk" stroke="#22d3ee" fill="rgba(34, 211, 238, 0.25)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>
        <GlassCard className="holo-panel">
          <h3 className="font-semibold mb-3">Recent Predictions</h3>
          <div className="space-y-3">
            {recentPredictions.map((entry) => (
              <div key={entry.id} className="rounded-xl border border-white/10 bg-white/5 p-3">
                <p className="text-xs text-white/50">{entry.date}</p>
                <p className="mt-1">{entry.risk} risk · {(entry.confidence * 100).toFixed(0)}%</p>
                <p className="text-xs mt-1 text-cyan-200">{entry.factors}</p>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </SectionWrapper>
  );
}

export default DashboardPage;
