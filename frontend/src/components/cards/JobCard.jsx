import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Briefcase, 
  MapPin, 
  DollarSign, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  ChevronDown, 
  ChevronUp 
} from "lucide-react";
import Badge from "../ui/Badge";
import Button from "../ui/Button";
import Card from "../ui/Card";
import formatSalary from "../../utils/formatSalary";

export default function JobCard({ jobMatch }) {
  const { job, match_score, match_label, matched_skills = [], missing_skills = [], explanation } = jobMatch;
  const [expanded, setExpanded] = useState(false);

  // Determine badge color
  let badgeVariant = "success"; // Emerald/high
  if (match_score < 50) {
    badgeVariant = "danger"; // Rose/low
  } else if (match_score < 75) {
    badgeVariant = "warning"; // Indigo/medium
  }

  return (
    <Card className={`relative overflow-hidden border transition-all duration-300 ${
      match_score >= 80 ? "border-emerald-500/20 hover:border-emerald-500/40" : "border-slate-800/80 hover:border-slate-700/80"
    }`}>
      {/* High Match Ribbon Tag */}
      {match_score >= 80 && (
        <div className="absolute top-0 right-0 bg-emerald-500/10 text-emerald-400 text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-bl-lg flex items-center gap-1 border-l border-b border-emerald-500/20">
          <Sparkles className="w-3 h-3 text-emerald-400 animate-pulse" />
          Top Pick
        </div>
      )}

      <div className="p-5">
        {/* Header section */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div className="space-y-1.5 max-w-[80%]">
            <span className="text-xs text-indigo-400 font-semibold tracking-wider uppercase">
              {job.industry}
            </span>
            <h3 className="text-lg font-bold text-white tracking-tight">{job.title}</h3>
            
            {/* Meta details */}
            <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-slate-400 mt-2 font-medium">
              <span className="flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5 text-indigo-400" />
                {job.seniority_level} • {job.work_type}
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-indigo-400" />
                {job.location}
              </span>
              <span className="flex items-center gap-1.5">
                <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                {formatSalary(job.salary_min)} - {formatSalary(job.salary_max)}
              </span>
            </div>
          </div>

          {/* Match Score Indicator */}
          <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center border border-slate-800/80 bg-slate-900/40 px-3 py-2 rounded-xl self-stretch md:self-auto gap-3 md:gap-1">
            <span className="text-[10px] text-slate-400 uppercase font-semibold tracking-wider">Match Score</span>
            <div className="flex items-center gap-2">
              <span className={`text-xl font-black ${
                match_score >= 75 ? "text-emerald-400" : match_score >= 50 ? "text-indigo-400" : "text-rose-400"
              }`}>{match_score}%</span>
              <Badge variant={badgeVariant} size="sm">{match_label}</Badge>
            </div>
          </div>
        </div>

        {/* Required skills snippet (preview) */}
        <div className="mt-4">
          <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold block mb-2">Key Required Skills</span>
          <div className="flex flex-wrap gap-1.5">
            {job.required_skills_json?.slice(0, 5).map((skill, index) => {
              const isMatched = matched_skills.includes(skill);
              return (
                <span 
                  key={index} 
                  className={`text-xs px-2.5 py-1 rounded-lg border font-medium flex items-center gap-1 transition-all ${
                    isMatched 
                      ? "bg-emerald-500/5 text-emerald-400 border-emerald-500/10" 
                      : "bg-slate-950 text-slate-400 border-slate-800"
                  }`}
                >
                  {isMatched ? (
                    <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                  ) : (
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-600 shrink-0" />
                  )}
                  {skill}
                </span>
              );
            })}
            {job.required_skills_json?.length > 5 && (
              <span className="text-[11px] text-indigo-400 font-medium px-2 py-1 flex items-center">
                +{job.required_skills_json.length - 5} more
              </span>
            )}
          </div>
        </div>

        {/* Drawer expand toggle */}
        <div className="mt-4 pt-4 border-t border-slate-800/80 flex items-center justify-between">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setExpanded(!expanded)}
            className="text-slate-400 hover:text-white flex items-center gap-1 text-xs px-0 hover:bg-transparent"
          >
            {expanded ? (
              <>
                <ChevronUp className="w-4 h-4 text-indigo-400" />
                Hide Details
              </>
            ) : (
              <>
                <ChevronDown className="w-4 h-4 text-indigo-400" />
                Analyze Compatibility & Full Details
              </>
            )}
          </Button>

          <Button 
            variant="primary" 
            size="sm"
            onClick={() => window.open(`mailto:recruiter@example.com?subject=Application for ${job.title}`, "_blank")}
            className="shadow-sm hover:shadow-indigo-500/10 text-xs px-4"
          >
            Apply Now
          </Button>
        </div>

        {/* Expanded panel details */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="pt-4 mt-2 space-y-4 border-t border-slate-800/50">
                {/* Description */}
                <div>
                  <h4 className="text-xs text-slate-400 uppercase tracking-wider font-semibold mb-1.5">Job Overview</h4>
                  <p className="text-sm text-slate-300 leading-relaxed bg-slate-950/60 p-3.5 rounded-xl border border-slate-800/50">
                    {job.description}
                  </p>
                </div>

                {/* AI Explanation / Analysis */}
                {explanation && (
                  <div className="bg-gradient-to-r from-indigo-950/40 via-purple-950/40 to-slate-950/40 border border-indigo-500/20 p-4 rounded-xl space-y-2">
                    <h4 className="text-xs text-indigo-300 uppercase tracking-wider font-bold flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-indigo-400 shrink-0 animate-pulse" />
                      AI Career Co-Pilot Insights
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed italic">
                      "{explanation}"
                    </p>
                  </div>
                )}

                {/* Skills Analysis breakdown */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Matched Skills */}
                  <div className="bg-slate-950/40 border border-slate-800/60 p-3 rounded-xl">
                    <h5 className="text-xs font-bold text-emerald-400 flex items-center gap-1.5 mb-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      Matching Skills ({matched_skills.length})
                    </h5>
                    {matched_skills.length > 0 ? (
                      <div className="flex flex-wrap gap-1">
                        {matched_skills.map((skill, idx) => (
                          <span key={idx} className="text-[11px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/10">
                            {skill}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <span className="text-xs text-slate-500 italic block">No exact skill matches.</span>
                    )}
                  </div>

                  {/* Missing Skills */}
                  <div className="bg-slate-950/40 border border-slate-800/60 p-3 rounded-xl">
                    <h5 className="text-xs font-bold text-indigo-400 flex items-center gap-1.5 mb-2">
                      <AlertCircle className="w-4 h-4 text-indigo-400" />
                      Missing Skills Gaps ({missing_skills.length})
                    </h5>
                    {missing_skills.length > 0 ? (
                      <div className="flex flex-wrap gap-1">
                        {missing_skills.map((skill, idx) => (
                          <span key={idx} className="text-[11px] px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/10">
                            {skill}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <span className="text-xs text-emerald-400 font-semibold block">You possess 100% of the skills for this job!</span>
                    )}
                  </div>
                </div>

                {/* Nice to Have Skills */}
                {job.nice_skills_json && job.nice_skills_json.length > 0 && (
                  <div>
                    <h4 className="text-xs text-slate-400 uppercase tracking-wider font-semibold mb-1.5">Nice to Have (Bonus Points)</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {job.nice_skills_json.map((skill, idx) => (
                        <span key={idx} className="text-xs px-2 py-0.5 rounded-lg bg-slate-900 text-indigo-300 border border-slate-800/80">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Card>
  );
}
