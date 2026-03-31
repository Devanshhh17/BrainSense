import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import GlassCard from "../components/GlassCard";
import NeonBadge from "../components/NeonBadge";
import SectionWrapper from "../components/SectionWrapper";
import { historyRecords, riskHistory } from "../data/mockData";
import usePageTitle from "../hooks/usePageTitle";

function HistoryPage() {
  usePageTitle("History");
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");

  const filtered = useMemo(() => {
    return historyRecords.filter((record) => {
      const matchesQuery =
        record.id.toLowerCase().includes(query.toLowerCase()) ||
        record.factors.join(" ").toLowerCase().includes(query.toLowerCase());
      const matchesFilter = filter === "All" || record.risk === filter;
      return matchesQuery && matchesFilter;
    });
  }, [query, filter]);

  return (
    <SectionWrapper>
      <div className="grid xl:grid-cols-3 gap-5">
        <GlassCard className="xl:col-span-2">
          <h3 className="font-semibold mb-4">History Risk Summary</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={riskHistory}>
                <CartesianGrid stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="name" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip contentStyle={{ background: "#0f172a", border: "1px solid rgba(255,255,255,0.1)" }} />
                <Area type="monotone" dataKey="risk" stroke="#22d3ee" fill="rgba(34, 211, 238, 0.26)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>
        <GlassCard>
          <h3 className="font-semibold">Filters</h3>
          <div className="mt-4 space-y-3">
            <label className="flex items-center gap-2 rounded-xl border border-white/10 px-3 py-2">
              <Search size={16} className="text-white/60" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search by id or factor..."
                className="bg-transparent w-full outline-none text-sm"
              />
            </label>
            <select
              value={filter}
              onChange={(event) => setFilter(event.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm"
            >
              <option>All</option>
              <option>Low</option>
              <option>Moderate</option>
              <option>Elevated</option>
            </select>
          </div>
        </GlassCard>
      </div>

      <GlassCard className="mt-5 overflow-x-auto">
        <h3 className="font-semibold mb-4">Prediction Entries</h3>
        {filtered.length === 0 ? (
          <div className="text-center py-10 text-white/60">No matching history records found.</div>
        ) : (
          <table className="w-full min-w-[740px] text-sm">
            <thead>
              <tr className="text-left text-white/60 border-b border-white/10">
                <th className="py-3 pr-4">Date</th>
                <th className="py-3 pr-4">Risk Level</th>
                <th className="py-3 pr-4">Confidence</th>
                <th className="py-3 pr-4">Key Factors</th>
                <th className="py-3">ID</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((record) => (
                <tr key={record.id} className="border-b border-white/5 hover:bg-white/5 transition cursor-pointer">
                  <td className="py-3 pr-4">{record.date}</td>
                  <td className="py-3 pr-4"><NeonBadge text={record.risk} /></td>
                  <td className="py-3 pr-4">{record.confidence}%</td>
                  <td className="py-3 pr-4">{record.factors.join(", ")}</td>
                  <td className="py-3 text-cyan-300">{record.id}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </GlassCard>
    </SectionWrapper>
  );
}

export default HistoryPage;
