import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Area,
  AreaChart,
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
  ScatterChart,
  Scatter
} from "recharts";
import GlassCard from "../components/ui/GlassCard";
import StatCard from "../components/features/StatCard";
import SectionWrapper from "../components/common/SectionWrapper";
import { dashboardStats, screenTimeTrend, stressTrend } from "../constants/mockData";
import usePageTitle from "../hooks/usePageTitle";

function DashboardPage() {
  usePageTitle("Dashboard");

  return (
    <SectionWrapper>
      {/* Title & Subtitle */}
      <div className="mb-6 select-none">
        <h2 className="text-2xl font-extrabold text-white tracking-tight">Analytical Dashboard</h2>
        <p className="text-xs text-[#A1A1AA] mt-0.5">Real-time cognitive intelligence and behavioral analytics</p>
      </div>

      {/* Stats Cards Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6 select-none">
        {dashboardStats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>

      {/* 2x2 Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 select-none">
        
        {/* WIDGET 1: COGNITIVE LOAD */}
        <GlassCard className="holo-panel flex flex-col justify-between h-80">
          <div>
            <h3 className="font-semibold text-xs uppercase tracking-widest text-[#A1A1AA]">Cognitive Load</h3>
            <p className="text-[10px] text-zinc-500 font-medium">Real-time mental strain gauge</p>
          </div>
          <div className="relative h-48 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart
                cx="50%"
                cy="70%"
                innerRadius="80%"
                outerRadius="100%"
                barSize={8}
                data={[{ name: "load", value: 68, fill: "#6EE7FF" }]}
                startAngle={180}
                endAngle={0}
              >
                <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
                <RadialBar background={{ fill: "rgba(255, 255, 255, 0.03)" }} dataKey="value" cornerRadius={10} />
              </RadialBarChart>
            </ResponsiveContainer>
            <div className="absolute text-center mt-6">
              <span className="text-4xl font-extrabold text-white tracking-tight drop-shadow-[0_0_15px_rgba(110,231,255,0.18)]">68%</span>
              <p className="text-[10px] uppercase font-bold tracking-wider text-zinc-500 mt-1">Status: Balanced</p>
            </div>
          </div>
        </GlassCard>

        {/* WIDGET 2: PERFORMANCE TREND */}
        <GlassCard className="holo-panel flex flex-col justify-between h-80">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-xs uppercase tracking-widest text-[#A1A1AA]">Performance Trend</h3>
              <p className="text-[10px] text-zinc-500 font-medium">Daily efficiency projection</p>
            </div>
            {/* Stats section */}
            <div className="flex gap-3 text-right">
              <div>
                <span className="text-[9px] uppercase font-bold tracking-wider text-zinc-500 block">Efficiency</span>
                <span className="text-xs font-bold text-[#6EE7FF]">92%</span>
              </div>
              <div className="w-[1px] h-6 bg-white/[0.08]" />
              <div>
                <span className="text-[9px] uppercase font-bold tracking-wider text-zinc-500 block">System Load</span>
                <span className="text-xs font-bold text-white">3.11</span>
              </div>
              <div className="w-[1px] h-6 bg-white/[0.08]" />
              <div>
                <span className="text-[9px] uppercase font-bold tracking-wider text-zinc-500 block">Resp Time</span>
                <span className="text-xs font-bold text-[#A1A1AA]">0.2ms</span>
              </div>
            </div>
          </div>
          <div className="h-48 mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={screenTimeTrend}>
                <CartesianGrid stroke="rgba(255,255,255,0.03)" vertical={false} />
                <XAxis dataKey="day" stroke="rgba(255,255,255,0.25)" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke="rgba(255,255,255,0.25)" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ background: "#0B0B0B", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "12px", fontSize: "11px" }} />
                <Line type="monotone" dataKey="value" stroke="#6EE7FF" strokeWidth={2} dot={{ fill: "#6EE7FF", r: 3 }} activeDot={{ r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        {/* WIDGET 3: DATA ANALYSIS */}
        <GlassCard className="holo-panel flex flex-col justify-between h-80">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-xs uppercase tracking-widest text-[#A1A1AA]">Data Analysis</h3>
              <p className="text-[10px] text-zinc-500 font-medium">Cognitive load vs Peak trend</p>
            </div>
            <div className="text-right">
              <span className="text-[9px] uppercase font-bold tracking-wider text-zinc-500 block">Aggregate Rate</span>
              <span className="text-2xl font-extrabold text-white">60%</span>
            </div>
          </div>
          <div className="h-48 mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={stressTrend.map(d => ({ ...d, "Cognitive Load": d.stress, "Peak Trend": d.fatigue }))}>
                <defs>
                  <linearGradient id="colorLoad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6EE7FF" stopOpacity={0.15}/>
                    <stop offset="95%" stopColor="#6EE7FF" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorPeak" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ffffff" stopOpacity={0.08}/>
                    <stop offset="95%" stopColor="#ffffff" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="rgba(255,255,255,0.03)" vertical={false} />
                <XAxis dataKey="week" stroke="rgba(255,255,255,0.25)" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke="rgba(255,255,255,0.25)" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ background: "#0B0B0B", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "12px", fontSize: "11px" }} />
                <Area type="monotone" dataKey="Cognitive Load" stroke="#6EE7FF" fillOpacity={1} fill="url(#colorLoad)" strokeWidth={1.5} />
                <Area type="monotone" dataKey="Peak Trend" stroke="#ffffff" fillOpacity={1} fill="url(#colorPeak)" strokeWidth={1.5} strokeDasharray="3 3" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        {/* WIDGET 4: PATTERN RECOGNITION */}
        <GlassCard className="holo-panel flex flex-col justify-between h-80">
          <div>
            <h3 className="font-semibold text-xs uppercase tracking-widest text-[#A1A1AA]">Pattern Recognition</h3>
            <p className="text-[10px] text-zinc-500 font-medium">Cognitive cluster mapping</p>
          </div>
          <div className="h-48 mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 10, right: 10, bottom: 10, left: -10 }}>
                <CartesianGrid stroke="rgba(255,255,255,0.03)" />
                <XAxis type="number" dataKey="x" stroke="rgba(255,255,255,0.25)" fontSize={9} tickLine={false} axisLine={false} />
                <YAxis type="number" dataKey="y" stroke="rgba(255,255,255,0.25)" fontSize={9} tickLine={false} axisLine={false} />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} contentStyle={{ background: "#0B0B0B", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "12px", fontSize: "11px" }} />
                <Scatter name="Clusters" data={[
                  { x: 12, y: 40 }, { x: 28, y: 55 }, { x: 45, y: 30 }, { x: 55, y: 70 },
                  { x: 62, y: 45 }, { x: 78, y: 80 }, { x: 84, y: 65 }, { x: 92, y: 90 },
                  { x: 35, y: 25 }, { x: 70, y: 50 }, { x: 50, y: 35 }
                ]} fill="#6EE7FF" />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

      </div>
    </SectionWrapper>
  );
}

export default DashboardPage;
