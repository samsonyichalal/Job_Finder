import React from "react";
import { 
  Radar, 
  RadarChart as RechartsRadar, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  ResponsiveContainer 
} from "recharts";

export default function RadarChart({ data }) {
  // If no data, supply nice baseline
  const chartData = data || [
    { subject: "Technical", A: 85, fullMark: 100 },
    { subject: "Soft Skills", A: 70, fullMark: 100 },
    { subject: "Domain", A: 75, fullMark: 100 },
    { subject: "Tools & Utilities", A: 90, fullMark: 100 },
    { subject: "Architecture", A: 65, fullMark: 100 },
    { subject: "Methodologies", A: 80, fullMark: 100 }
  ];

  return (
    <div className="w-full h-72">
      <ResponsiveContainer width="100%" height="100%">
        <RechartsRadar cx="50%" cy="50%" outerRadius="75%" data={chartData}>
          <PolarGrid stroke="#2D2A4A" />
          <PolarAngleAxis 
            dataKey="subject" 
            tick={{ fill: "#94A3B8", fontSize: 11, fontWeight: 500 }} 
          />
          <PolarRadiusAxis 
            angle={30} 
            domain={[0, 100]} 
            tick={{ fill: "#94A3B8", fontSize: 10 }}
            stroke="#2D2A4A"
          />
          <Radar
            name="Your Skills Profile"
            dataKey="A"
            stroke="#4F46E5"
            fill="#7C3AED"
            fillOpacity={0.35}
          />
        </RechartsRadar>
      </ResponsiveContainer>
    </div>
  );
}
