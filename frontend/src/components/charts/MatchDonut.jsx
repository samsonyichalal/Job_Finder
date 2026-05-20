import React from "react";
import { motion } from "framer-motion";

export default function MatchDonut({ score = 75, size = 160, strokeWidth = 14 }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  // Determine colors based on score
  let strokeColor = "url(#match-glow-high)";
  let textColor = "text-emerald-400";
  let label = "High Match";

  if (score < 50) {
    strokeColor = "url(#match-glow-low)";
    textColor = "text-rose-400";
    label = "Low Match";
  } else if (score < 75) {
    strokeColor = "url(#match-glow-med)";
    textColor = "text-indigo-400";
    label = "Med Match";
  }

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="relative" style={{ width: size, height: size }}>
        <svg className="w-full h-full transform -rotate-90" viewBox={`0 0 ${size} ${size}`}>
          <defs>
            <linearGradient id="match-glow-high" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10B981" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>
            <linearGradient id="match-glow-med" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6366F1" />
              <stop offset="100%" stopColor="#4F46E5" />
            </linearGradient>
            <linearGradient id="match-glow-low" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F43F5E" />
              <stop offset="100%" stopColor="#E11D48" />
            </linearGradient>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
          
          {/* Background Track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            className="stroke-slate-800 fill-none"
            strokeWidth={strokeWidth}
          />
          
          {/* Active Progress */}
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            className="fill-none"
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            strokeLinecap="round"
            style={{ filter: "drop-shadow(0px 0px 6px rgba(124, 58, 237, 0.2))" }}
          />
        </svg>

        {/* Central Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <motion.span 
            className={`text-3xl font-extrabold tracking-tight ${textColor}`}
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            {score}%
          </motion.span>
          <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold mt-0.5">
            {label}
          </span>
        </div>
      </div>
    </div>
  );
}
