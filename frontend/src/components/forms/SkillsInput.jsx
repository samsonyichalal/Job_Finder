import React, { useState } from "react";
import { Plus, X, Sparkles } from "lucide-react";
import Input from "../ui/Input";
import Button from "../ui/Button";

export default function SkillsInput({ value = [], onChange, label = "Your Skills Inventory" }) {
  const [inputValue, setInputValue] = useState("");

  const popularSuggestions = [
    "Python", "React", "SQL", "Docker", "AWS", "Kubernetes", 
    "TypeScript", "Node.js", "FastAPI", "Figma", "UI/UX", 
    "Excel", "Finance", "Valuation", "Machine Learning", "Git", "CI/CD"
  ];

  const handleAddSkill = (skill) => {
    const trimmed = skill.trim();
    if (!trimmed) return;
    
    // Prevent duplicates case-insensitively
    const exists = value.some(s => s.toLowerCase() === trimmed.toLowerCase());
    if (!exists) {
      onChange([...value, trimmed]);
    }
    setInputValue("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      handleAddSkill(inputValue);
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    onChange(value.filter(s => s !== skillToRemove));
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
          {label}
        </label>
        
        {/* Input box */}
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Input
              type="text"
              placeholder="Type a skill (e.g. AWS, Figma) and press Enter"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              className="bg-slate-950 border-slate-800 text-white placeholder-slate-500 pr-10 focus:border-indigo-500/50"
            />
            {inputValue && (
              <button
                type="button"
                onClick={() => handleAddSkill(inputValue)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-indigo-400 hover:text-white transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Active tags */}
      {value.length > 0 ? (
        <div className="bg-slate-950/40 border border-slate-800/80 p-4 rounded-xl">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-2">
            Active Skills ({value.length})
          </span>
          <div className="flex flex-wrap gap-2">
            {value.map((skill, index) => (
              <span
                key={index}
                className="text-xs font-bold bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all hover:border-rose-500/30 hover:text-rose-400 hover:bg-rose-500/5 group cursor-pointer"
                onClick={() => handleRemoveSkill(skill)}
                title="Click to remove"
              >
                {skill}
                <X className="w-3 h-3 text-indigo-400 group-hover:text-rose-400 shrink-0 transition-colors" />
              </span>
            ))}
          </div>
        </div>
      ) : (
        <div className="border border-dashed border-slate-800 p-6 rounded-xl text-center">
          <p className="text-xs text-slate-500 italic">No skills selected yet. Add skills manually or click from recommendations below.</p>
        </div>
      )}

      {/* Curated suggestions */}
      <div>
        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider flex items-center gap-1 mb-2">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" /> Suggested Popular Skills
        </span>
        <div className="flex flex-wrap gap-1.5">
          {popularSuggestions.map((skill, index) => {
            const isSelected = value.some(s => s.toLowerCase() === skill.toLowerCase());
            return (
              <button
                key={index}
                type="button"
                onClick={() => isSelected ? handleRemoveSkill(skill) : handleAddSkill(skill)}
                className={`text-[11px] font-semibold px-2.5 py-1.5 rounded-lg border transition-all ${
                  isSelected
                    ? "bg-indigo-600 border-indigo-400 text-white shadow-md shadow-indigo-600/15"
                    : "bg-slate-900/40 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700"
                }`}
              >
                {isSelected ? "✓ " : ""}
                {skill}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
