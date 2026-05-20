import React from "react";
import { FileText, ClipboardList } from "lucide-react";

export default function ResumeTextArea({ value, onChange, placeholder = "Paste the plain text of your resume here..." }) {
  const charCount = value ? value.length : 0;
  const wordCount = value ? value.trim().split(/\s+/).filter(Boolean).length : 0;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs text-slate-400 font-semibold uppercase tracking-wider mb-1">
        <span className="flex items-center gap-1.5">
          <FileText className="w-4 h-4 text-indigo-400" /> Paste Resume Content
        </span>
        <span className="flex items-center gap-1">
          <ClipboardList className="w-3.5 h-3.5" /> Character limit: 10,000 max
        </span>
      </div>

      <div className="relative group">
        <textarea
          rows={10}
          maxLength={10000}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-slate-950/80 border border-slate-800 text-slate-200 placeholder-slate-500 rounded-xl p-4 text-sm focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all font-mono leading-relaxed"
        />
        
        {/* Glow border background effect */}
        <div className="absolute inset-0 border border-indigo-500/0 group-focus-within:border-indigo-500/10 rounded-xl pointer-events-none transition-all duration-300" />
      </div>

      <div className="flex justify-between items-center text-xs text-slate-500 font-medium px-1">
        <span>Avoid graphics or special tables. Copy-paste directly from Word or PDF.</span>
        <span className="flex items-center gap-3">
          <span>{wordCount} words</span>
          <span>{charCount} / 10,000 chars</span>
        </span>
      </div>
    </div>
  );
}
