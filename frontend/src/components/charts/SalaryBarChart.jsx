import React from "react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  Cell 
} from "recharts";
import formatSalary from "../../utils/formatSalary";

export default function SalaryBarChart({ min = 50000, max = 120000, median = 85000 }) {
  const data = [
    { name: "Market Min", amount: min, fill: "#F43F5E" },
    { name: "Market Median", amount: median, fill: "#4F46E5" },
    { name: "Market Max", amount: max, fill: "#10B981" }
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border p-3 rounded-lg shadow-lg">
          <p className="text-xs font-semibold text-muted uppercase">{payload[0].payload.name}</p>
          <p className="text-sm font-bold text-white mt-0.5">{formatSalary(payload[0].value)}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-44">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 10, right: 30, left: 10, bottom: 10 }}
        >
          <XAxis 
            type="number" 
            stroke="#94A3B8" 
            fontSize={11} 
            tickFormatter={(v) => `$${v / 1000}k`}
            axisLine={false}
          />
          <YAxis 
            dataKey="name" 
            type="category" 
            stroke="#94A3B8" 
            fontSize={11} 
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(45, 42, 74, 0.2)" }} />
          <Bar dataKey="amount" radius={[0, 4, 4, 0]} barSize={20}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
