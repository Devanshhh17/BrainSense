import { RadialBarChart, RadialBar, PolarAngleAxis, ResponsiveContainer } from "recharts";

function PredictionGauge({ value }) {
  const percent = typeof value === "number" && value <= 1 ? Number((value * 100).toFixed(1)) : value;
  const data = [{ name: "confidence", value: percent, fill: "#2dd4ff" }];

  return (
    <div className="h-72">
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart
          cx="50%"
          cy="50%"
          innerRadius="65%"
          outerRadius="95%"
          barSize={16}
          data={data}
          startAngle={210}
          endAngle={-30}
        >
          <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
          <RadialBar background dataKey="value" cornerRadius={12} />
        </RadialBarChart>
      </ResponsiveContainer>
      <div className="text-center -mt-32">
        <p className="text-4xl font-bold text-cyan-300">{percent}%</p>
        <p className="text-sm text-white/65 mt-1">Model confidence</p>
      </div>
    </div>
  );
}

export default PredictionGauge;
