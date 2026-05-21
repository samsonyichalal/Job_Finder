import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Award, CheckCircle2, AlertCircle, Clock, RefreshCw, Zap } from "lucide-react";
import careerService from "../services/careerService";
import RadarChart from "../components/charts/RadarChart";
import Button from "../components/ui/Button";
import Badge from "../components/ui/Badge";
import Card from "../components/ui/Card";
import useAuth from "../hooks/useAuth";

export default function Skills() {
  const { user } = useAuth();
  const [skillGap, setSkillGap] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchGap = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await careerService.getSkillsGap();
      setSkillGap(data);
    } catch (e) {
      setError("Failed to load skill gap analysis.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchGap(); }, []);

  // Build radar chart data from user skills
  const radarData = user?.skills?.length > 0
    ? [
        { subject: "Technical", A: Math.min(100, (user.skills.filter(s => ["python","javascript","typescript","java","sql","react","node"].some(t => s.toLowerCase().includes(t))).length / Math.max(1, user.skills.length)) * 100 + 40), fullMark: 100 },
        { subject: "Cloud & DevOps", A: Math.min(100, (user.skills.filter(s => ["aws","docker","kubernetes","ci/cd","terraform","gcp","azure"].some(t => s.toLowerCase().includes(t))).length * 25) + 20), fullMark: 100 },
        { subject: "Data & AI", A: Math.min(100, (user.skills.filter(s => ["machine learning","data","sql","pandas","tensorflow","pytorch"].some(t => s.toLowerCase().includes(t))).length * 25) + 20), fullMark: 100 },
        { subject: "Design & UX", A: Math.min(100, (user.skills.filter(s => ["figma","ui","ux","design","css","tailwind"].some(t => s.toLowerCase().includes(t))).length * 30) + 15), fullMark: 100 },
        { subject: "Soft Skills", A: Math.min(100, (user.skills.filter(s => ["agile","scrum","communication","leadership","management"].some(t => s.toLowerCase().includes(t))).length * 25) + 30), fullMark: 100 },
        { subject: "Tools", A: Math.min(100, (user.skills.filter(s => ["git","jira","slack","excel","notion","vscode"].some(t => s.toLowerCase().includes(t))).length * 20) + 25), fullMark: 100 },
      ]
    : null;

  const priorityColor = (p) => p === "High" ? "danger" : "warning";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <Award className="w-6 h-6 text-amber-400" />
            Skills Gap Analysis
          </h1>
          <p className="text-sm text-muted mt-1">
            See exactly what you have, what you're missing, and how long it takes to learn.
          </p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={fetchGap}
          disabled={loading}
          className="flex items-center gap-2 text-xs border-slate-800"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </div>

      {error && (
        <div className="bg-danger/10 border border-danger/20 text-danger text-sm px-4 py-3 rounded-xl">
          {error}
        </div>
      )}

      {loading ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[1, 2].map((i) => (
            <div key={i} className="bg-card/60 border border-border/80 rounded-2xl p-6 animate-pulse h-64" />
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          {/* Radar + summary */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Radar chart */}
            <Card className="p-5">
              <h2 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Skills Profile Radar</h2>
              <RadarChart data={radarData} />
              <p className="text-xs text-muted text-center mt-2">Based on your {user?.skills?.length || 0} listed skills</p>
            </Card>

            {/* Summary stats */}
            <div className="space-y-4">
              {/* Skills you have */}
              <Card className="p-5 border-emerald-500/20 bg-emerald-950/10">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider">
                    Skills You Have ({skillGap?.has?.length || 0})
                  </h3>
                </div>
                {skillGap?.has?.length > 0 ? (
                  <div className="flex flex-wrap gap-1.5">
                    {skillGap.has.map((skill, i) => (
                      <span key={i} className="text-xs px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
                        ✓ {skill}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-muted italic">No matching skills found for current job requirements.</p>
                )}
              </Card>

              {/* Partial matches */}
              {skillGap?.partial?.length > 0 && (
                <Card className="p-5 border-indigo-500/20 bg-indigo-950/10">
                  <div className="flex items-center gap-2 mb-3">
                    <Zap className="w-4 h-4 text-indigo-400" />
                    <h3 className="text-sm font-bold text-indigo-400 uppercase tracking-wider">
                      Partial Matches ({skillGap.partial.length})
                    </h3>
                  </div>
                  <div className="space-y-2">
                    {skillGap.partial.map((item, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs">
                        <span className="text-indigo-300 font-semibold">{item.skill}</span>
                        <span className="text-muted">overlaps with</span>
                        <span className="text-slate-300 font-medium">{item.overlap_with}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              )}
            </div>
          </div>

          {/* Missing skills table */}
          <Card className="p-5">
            <div className="flex items-center gap-2 mb-4">
              <AlertCircle className="w-4 h-4 text-rose-400" />
              <h2 className="text-sm font-bold text-white uppercase tracking-wider">
                Missing Skills ({skillGap?.missing?.length || 0})
              </h2>
            </div>

            {skillGap?.missing?.length === 0 ? (
              <div className="text-center py-8">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto mb-2" />
                <p className="text-sm font-bold text-emerald-400">You have all required skills!</p>
                <p className="text-xs text-muted mt-1">You're fully aligned with current job requirements.</p>
              </div>
            ) : (
              <div className="space-y-2">
                {/* Header row */}
                <div className="grid grid-cols-12 gap-3 px-3 py-2 text-[10px] text-muted font-bold uppercase tracking-wider border-b border-slate-800/60">
                  <span className="col-span-5">Skill</span>
                  <span className="col-span-3">Priority</span>
                  <span className="col-span-4">Est. Learn Time</span>
                </div>
                {skillGap.missing.map((gap, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                    className="grid grid-cols-12 gap-3 px-3 py-3 rounded-xl hover:bg-slate-900/30 transition-colors items-center"
                  >
                    <div className="col-span-5 flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full shrink-0 ${gap.priority === "High" ? "bg-rose-400" : "bg-amber-400"}`} />
                      <span className="text-sm font-semibold text-white">{gap.skill}</span>
                    </div>
                    <div className="col-span-3">
                      <Badge variant={priorityColor(gap.priority)} className="text-[10px]">
                        {gap.priority}
                      </Badge>
                    </div>
                    <div className="col-span-4 flex items-center gap-1.5 text-xs text-muted">
                      <Clock className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                      {gap.learn_time}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </Card>

          {/* Your full skills list */}
          {user?.skills?.length > 0 && (
            <Card className="p-5">
              <h2 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
                Your Full Skills Inventory ({user.skills.length})
              </h2>
              <div className="flex flex-wrap gap-2">
                {user.skills.map((skill, i) => (
                  <span key={i} className="text-xs px-3 py-1.5 rounded-lg bg-primary/10 text-primary border border-primary/20 font-semibold">
                    {skill}
                  </span>
                ))}
              </div>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}
