import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Map, ChevronRight, CheckCircle2 } from "lucide-react";
import Card from "../ui/Card";
import Badge from "../ui/Badge";

export default function PathCard({ path, index }) {
  const [activeStep, setActiveStep] = useState(0);

  // Gradient definitions per index
  const gradientStyles = [
    "from-indigo-500 to-purple-600 border-indigo-500/20",
    "from-purple-500 to-pink-600 border-purple-500/20",
    "from-emerald-500 to-teal-600 border-emerald-500/20"
  ];
  
  const textStyles = [
    "text-indigo-400",
    "text-purple-400",
    "text-emerald-400"
  ];

  const currentGradient = gradientStyles[index % gradientStyles.length];
  const currentTextColor = textStyles[index % textStyles.length];

  return (
    <Card className="border border-slate-800/80 bg-slate-900/10 hover:bg-slate-900/25 transition-all duration-300 p-5 md:p-6 flex flex-col md:grid md:grid-cols-12 gap-6 relative group overflow-hidden">
      {/* Dynamic Background Glow Layer */}
      <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/2 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Path overview (4 columns on md) */}
      <div className="md:col-span-5 space-y-4 pr-0 md:pr-4 flex flex-col justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="flex items-center justify-center w-6 h-6 rounded-lg bg-indigo-500/10 text-xs font-bold text-indigo-400 border border-indigo-500/10">
              0{index + 1}
            </span>
            <span className="text-[10px] text-slate-400 uppercase font-bold tracking-widest flex items-center gap-1">
              <Map className="w-3.5 h-3.5" /> Recommended Trajectory
            </span>
          </div>
          <h3 className="text-xl font-bold text-white tracking-tight">{path.path_name}</h3>
          <p className="text-sm text-slate-400 leading-relaxed pt-1">{path.description}</p>
        </div>

        {/* Fit Analysis */}
        {path.why_it_fits && (
          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/60 mt-4 md:mt-0 flex gap-2.5 items-start">
            <Sparkles className="w-4.5 h-4.5 text-indigo-400 shrink-0 mt-0.5 animate-pulse" />
            <div className="space-y-0.5">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Why this is recommended</span>
              <p className="text-xs text-indigo-200 leading-normal">{path.why_it_fits}</p>
            </div>
          </div>
        )}
      </div>

      {/* Stepper timeline (7 columns on md) */}
      <div className="md:col-span-7 flex flex-col justify-center border-l md:border-l border-slate-800/80 pl-0 md:pl-6 pt-4 md:pt-0">
        <h4 className="text-[10px] text-slate-400 uppercase tracking-widest font-extrabold mb-4 block">Milestone Career Steps</h4>
        
        <div className="space-y-3 relative">
          {path.steps?.map((step, idx) => {
            const isActive = idx === activeStep;
            const isCompleted = idx < activeStep;
            
            // Labels for milestones
            const levels = ["Entry Level", "Mid Level", "Senior Level", "Peak Success"];
            
            return (
              <motion.div
                key={idx}
                onClick={() => setActiveStep(idx)}
                className={`relative flex items-start gap-4 p-3 rounded-xl border cursor-pointer transition-all duration-300 ${
                  isActive 
                    ? "bg-slate-950 border-slate-800 shadow-md scale-[1.01]" 
                    : "bg-transparent border-transparent hover:bg-slate-950/20 hover:border-slate-800/20"
                }`}
                whileHover={{ x: 2 }}
              >
                {/* Visual Connector Dot */}
                <div className="flex flex-col items-center justify-start h-full mt-1">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center border transition-all duration-300 ${
                    isCompleted 
                      ? "bg-emerald-500/10 border-emerald-500 text-emerald-400" 
                      : isActive 
                        ? "bg-indigo-600 border-indigo-400 text-white shadow-lg shadow-indigo-500/30" 
                        : "bg-slate-900 border-slate-800 text-slate-500"
                  }`}>
                    {isCompleted ? (
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    ) : (
                      <span className="text-[10px] font-bold">{idx + 1}</span>
                    )}
                  </div>
                  {idx < path.steps.length - 1 && (
                    <div className={`w-0.5 h-10 mt-1.5 transition-all duration-300 ${
                      idx < activeStep ? "bg-emerald-500/30" : "bg-slate-800"
                    }`} />
                  )}
                </div>

                {/* Step Metadata */}
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className={`text-xs font-semibold ${isActive ? currentTextColor : "text-slate-400"}`}>
                      {levels[idx]}
                    </span>
                    <span className="text-[10px] text-slate-500 font-bold uppercase">{step.timeline}</span>
                  </div>
                  <div className="flex flex-wrap items-center justify-between gap-1">
                    <h5 className={`text-sm font-bold tracking-tight ${isActive ? "text-white" : "text-slate-300"}`}>
                      {step.role}
                    </h5>
                    <Badge variant="success" size="sm" className="bg-emerald-500/5 text-emerald-400 border border-emerald-500/10 font-bold">
                      {step.salary_range}
                    </Badge>
                  </div>
                </div>

                {/* Arrow indicator when active */}
                {isActive && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 hidden md:block">
                    <ChevronRight className={`w-4 h-4 ${currentTextColor}`} />
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </Card>
  );
}
