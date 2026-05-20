import React from "react";
import Card from "../ui/Card";

export default function StatCard({ label, value, description, icon: Icon, trend = null, className = "" }) {
  return (
    <Card className={`relative overflow-hidden border border-slate-800/80 bg-slate-900/10 hover:bg-slate-900/20 transition-all duration-300 p-5 ${className}`}>
      {/* Decorative gradient overlay */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-indigo-500/5 to-transparent rounded-bl-full pointer-events-none" />

      <div className="flex items-center justify-between">
        <span className="text-xs text-slate-400 font-semibold tracking-wider uppercase">
          {label}
        </span>
        {Icon && (
          <div className="w-9 h-9 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center text-indigo-400 shadow-sm shrink-0">
            <Icon className="w-4.5 h-4.5" />
          </div>
        )}
      </div>

      <div className="mt-3 flex items-baseline gap-2">
        <h3 className="text-3xl font-extrabold text-white tracking-tight leading-none">
          {value}
        </h3>
        {trend && (
          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded flex items-center shrink-0 gap-0.5 ${
            trend.type === "positive" 
              ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/10" 
              : "bg-indigo-500/10 text-indigo-400 border border-indigo-500/10"
          }`}>
            {trend.value}
          </span>
        )}
      </div>

      {description && (
        <p className="text-xs text-slate-400 mt-2 font-medium leading-relaxed truncate">
          {description}
        </p>
      )}
    </Card>
  );
}
