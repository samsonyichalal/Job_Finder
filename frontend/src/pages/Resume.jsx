import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText, Sparkles, CheckCircle2, AlertCircle,
  ArrowUpRight, ChevronDown, ChevronUp, Tag
} from "lucide-react";
import careerService from "../services/careerService";
import ResumeTextArea from "../components/forms/ResumeTextArea";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";

export default function Resume() {
  const [resumeText, setResumeText] = useState("");
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showBullets, setShowBullets] = useState(false);

  const handleAnalyze = async () => {
    if (!resumeText.trim()) {
      setError("Please paste your resume text before analyzing.");
      return;
    }
    setLoading(true);
    setError("");
    setAnalysis(null);
    try {
      const data = await careerService.analyzeResume(resumeText);
      setAnalysis(data);
    } catch (e) {
      setError(e?.response?.data?.detail || "Analysis failed. Make sure your profile is complete.");
    } finally {
      setLoading(false);
    }
  };

  const scoreColor = (score) => {
    if (score >= 80) return "text-emerald-400";
    if (score >= 60) return "text-indigo-400";
    return "text-rose-400";
  };

  const scoreLabel = (score) => {
    if (score >= 80) return "Excellent";
    if (score >= 60) return "Good";
    if (score >= 40) return "Fair";
    return "Needs Work";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
          <FileText className="w-6 h-6 text-emerald-400" />
          Resume Analyzer
        </h1>
        <p className="text-sm text-muted mt-1">
          Paste your resume to get an ATS score, keyword analysis, and AI-powered improvements.
        </p>
      </div>

      {/* Input area */}
      <Card className="p-6 space-y-4">
        <ResumeTextArea value={resumeText} onChange={setResumeText} />

        {error && (
          <div className="flex items-center gap-2 bg-danger/10 border border-danger/20 text-danger text-sm px-4 py-3 rounded-xl">
            <AlertCircle className="w-4 h-4 shrink-0" />
            {error}
          </div>
        )}

        <Button
          variant="primary"
          onClick={handleAnalyze}
          disabled={loading || !resumeText.trim()}
          className="w-full py-3 font-bold flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Analyzing with AI...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              Analyze Resume
            </>
          )}
        </Button>
      </Card>

      {/* Results */}
      <AnimatePresence>
        {analysis && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.4 }}
            className="space-y-5"
          >
            {/* Score hero */}
            <Card className="p-6 border-indigo-500/20 bg-indigo-950/10">
              <div className="flex flex-col sm:flex-row sm:items-center gap-6">
                <div className="flex flex-col items-center justify-center w-28 h-28 rounded-2xl bg-slate-950 border border-slate-800 shrink-0 mx-auto sm:mx-0">
                  <span className={`text-4xl font-black ${scoreColor(analysis.score)}`}>
                    {analysis.score}
                  </span>
                  <span className="text-[10px] text-muted font-bold uppercase tracking-wider mt-0.5">/ 100</span>
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                    <Sparkles className="w-4 h-4 text-indigo-400 animate-pulse" />
                    <span className="text-xs text-indigo-400 font-bold uppercase tracking-wider">ATS Compatibility Score</span>
                  </div>
                  <h2 className={`text-2xl font-black ${scoreColor(analysis.score)}`}>
                    {scoreLabel(analysis.score)}
                  </h2>
                  <div className="mt-3 h-2 bg-slate-900 rounded-full overflow-hidden max-w-xs mx-auto sm:mx-0">
                    <motion.div
                      className={`h-full rounded-full ${analysis.score >= 80 ? "bg-emerald-500" : analysis.score >= 60 ? "bg-indigo-500" : "bg-rose-500"}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${analysis.score}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                    />
                  </div>
                  {analysis.missing_sections?.length > 0 && (
                    <p className="text-xs text-muted mt-2">
                      Missing sections: <span className="text-rose-400 font-semibold">{analysis.missing_sections.join(", ")}</span>
                    </p>
                  )}
                </div>
              </div>
            </Card>

            {/* Strengths & Weaknesses */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Card className="p-5 border-emerald-500/20 bg-emerald-950/10">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider">
                    Strengths ({analysis.strengths?.length || 0})
                  </h3>
                </div>
                <ul className="space-y-2">
                  {analysis.strengths?.map((s, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                      <span className="text-emerald-400 mt-0.5 shrink-0">✓</span>
                      {s}
                    </li>
                  ))}
                </ul>
              </Card>

              <Card className="p-5 border-rose-500/20 bg-rose-950/10">
                <div className="flex items-center gap-2 mb-3">
                  <AlertCircle className="w-4 h-4 text-rose-400" />
                  <h3 className="text-sm font-bold text-rose-400 uppercase tracking-wider">
                    Weaknesses ({analysis.weaknesses?.length || 0})
                  </h3>
                </div>
                <ul className="space-y-2">
                  {analysis.weaknesses?.map((w, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                      <span className="text-rose-400 mt-0.5 shrink-0">✗</span>
                      {w}
                    </li>
                  ))}
                </ul>
              </Card>
            </div>

            {/* ATS Keywords */}
            {analysis.ats_keywords?.length > 0 && (
              <Card className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Tag className="w-4 h-4 text-indigo-400" />
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                    ATS Keywords Detected ({analysis.ats_keywords.length})
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {analysis.ats_keywords.map((kw, i) => (
                    <span key={i} className="text-xs px-2.5 py-1 rounded-lg bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 font-medium">
                      {kw}
                    </span>
                  ))}
                </div>
              </Card>
            )}

            {/* Improved bullets */}
            {analysis.improved_bullets?.length > 0 && (
              <Card className="p-5">
                <button
                  onClick={() => setShowBullets(!showBullets)}
                  className="w-full flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <ArrowUpRight className="w-4 h-4 text-amber-400" />
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                      AI-Improved Bullet Points ({analysis.improved_bullets.length})
                    </h3>
                  </div>
                  {showBullets ? (
                    <ChevronUp className="w-4 h-4 text-muted" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-muted" />
                  )}
                </button>

                <AnimatePresence>
                  {showBullets && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-4 space-y-4">
                        {analysis.improved_bullets.map((bullet, i) => (
                          <div key={i} className="space-y-2">
                            <div className="bg-rose-950/20 border border-rose-500/20 rounded-xl p-3">
                              <span className="text-[10px] text-rose-400 font-bold uppercase tracking-wider block mb-1">Original</span>
                              <p className="text-xs text-slate-400 leading-relaxed">{bullet.original}</p>
                            </div>
                            <div className="bg-emerald-950/20 border border-emerald-500/20 rounded-xl p-3">
                              <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider block mb-1">Improved</span>
                              <p className="text-xs text-slate-200 leading-relaxed font-medium">{bullet.improved}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
