import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { DollarSign, Search, Sparkles, TrendingUp, MapPin, Briefcase } from "lucide-react";
import careerService from "../services/careerService";
import SalaryBarChart from "../components/charts/SalaryBarChart";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import formatSalary from "../utils/formatSalary";
import StatusBanner from "../components/ui/StatusBanner";
import { getApiErrorInfo } from "../utils/errorUtils";

const LEVELS = ["junior", "mid", "senior", "lead", "principal"];

const POPULAR_ROLES = [
  "Software Engineer", "Data Scientist", "Product Manager",
  "UX Designer", "DevOps Engineer", "Machine Learning Engineer",
  "Frontend Developer", "Backend Developer", "Full Stack Developer",
  "Data Analyst", "Cloud Architect", "Security Engineer",
];

export default function Salary() {
  const navigate = useNavigate();
  const [role, setRole] = useState("");
  const [location, setLocation] = useState("");
  const [level, setLevel] = useState("mid");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!role.trim()) { setError("Please enter a job role."); return; }
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const data = await careerService.getSalaryEstimate(role, location, level);
      setResult(data);
    } catch (e) {
      const info = getApiErrorInfo(e);
      setError(info.message || "Failed to fetch salary estimate.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
          <DollarSign className="w-6 h-6 text-emerald-400" />
          Salary Insights
        </h1>
        <p className="text-sm text-muted mt-1">
          Get AI-powered salary estimates for any role, location, and seniority level.
        </p>
      </div>

      {/* Search form */}
      <Card className="p-6 space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="relative">
            <Briefcase className="absolute left-3 top-[38px] w-4 h-4 text-muted pointer-events-none" />
            <Input
              label="Job Role"
              placeholder="e.g. Software Engineer"
              value={role}
              onChange={(e) => { setRole(e.target.value); setError(""); }}
              className="pl-10"
            />
          </div>
          <div className="relative">
            <MapPin className="absolute left-3 top-[38px] w-4 h-4 text-muted pointer-events-none" />
            <Input
              label="Location (optional)"
              placeholder="e.g. San Francisco, Remote"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Level selector */}
        <div>
          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
            Seniority Level
          </label>
          <div className="flex flex-wrap gap-2">
            {LEVELS.map((lvl) => (
              <button
                key={lvl}
                onClick={() => setLevel(lvl)}
                className={`px-4 py-2 rounded-xl border text-sm font-semibold capitalize transition-all ${
                  level === lvl
                    ? "bg-primary/10 border-primary/40 text-white"
                    : "bg-card/40 border-border/60 text-muted hover:text-white hover:border-slate-700"
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>
        </div>

        {error && <StatusBanner tone="danger" title="Salary estimate unavailable" message={error} actionLabel="Retry" onAction={handleSearch} />}

        <Button
          variant="primary"
          onClick={handleSearch}
          disabled={loading || !role.trim()}
          className="w-full py-3 font-bold flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Estimating...
            </>
          ) : (
            <>
              <Search className="w-4 h-4" />
              Get Salary Estimate
            </>
          )}
        </Button>

        {/* Popular roles */}
        <div>
          <p className="text-xs text-muted font-semibold uppercase tracking-wider mb-2">Popular Roles</p>
          <div className="flex flex-wrap gap-1.5">
            {POPULAR_ROLES.map((r) => (
              <button
                key={r}
                onClick={() => setRole(r)}
                className={`text-xs px-2.5 py-1.5 rounded-lg border transition-all font-medium ${
                  role === r
                    ? "bg-primary/10 border-primary/30 text-primary"
                    : "bg-slate-900/40 border-slate-800 text-muted hover:text-white hover:border-slate-700"
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* Results */}
      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-5"
          >
            {/* Salary range hero */}
            <Card className="p-6 border-emerald-500/20 bg-emerald-950/10">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-4 h-4 text-emerald-400 animate-pulse" />
                <span className="text-xs text-emerald-400 font-bold uppercase tracking-wider">AI Salary Estimate</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-6">
                <div className="flex-1">
                  <h2 className="text-xl font-black text-white capitalize">
                    {result.role || role} · {result.level || level}
                  </h2>
                  {(result.location || location) && (
                    <p className="text-sm text-muted mt-0.5 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" /> {result.location || location}
                    </p>
                  )}
                  <div className="flex flex-wrap gap-4 mt-4">
                    <div className="text-center">
                      <p className="text-[10px] text-muted font-bold uppercase tracking-wider">Min</p>
                      <p className="text-lg font-black text-rose-400">{formatSalary(result.min)}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-[10px] text-muted font-bold uppercase tracking-wider">Median</p>
                      <p className="text-2xl font-black text-indigo-400">{formatSalary(result.median)}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-[10px] text-muted font-bold uppercase tracking-wider">Max</p>
                      <p className="text-lg font-black text-emerald-400">{formatSalary(result.max)}</p>
                    </div>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <SalaryBarChart min={result.min} median={result.median} max={result.max} />
                </div>
              </div>
            </Card>

            {/* Insights */}
            {result.insights && (
              <Card className="p-5 border-indigo-500/20 bg-indigo-950/10">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="w-4 h-4 text-indigo-400" />
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">Market Insights</h3>
                </div>
                <p className="text-sm text-slate-300 leading-relaxed">{result.insights}</p>
              </Card>
            )}

            {/* Factors */}
            {result.factors && result.factors.length > 0 && (
              <Card className="p-5">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-3">Salary Factors</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {result.factors.map((factor, i) => (
                    <div key={i} className="flex items-start gap-2 bg-slate-950/40 border border-slate-800 rounded-xl p-3">
                      <span className="text-indigo-400 mt-0.5 shrink-0">→</span>
                      <p className="text-xs text-slate-300 leading-relaxed">{factor}</p>
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
