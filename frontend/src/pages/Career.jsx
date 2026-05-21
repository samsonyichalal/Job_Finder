import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp, RefreshCw, Sparkles, Map } from "lucide-react";
import careerService from "../services/careerService";
import PathCard from "../components/cards/PathCard";
import Button from "../components/ui/Button";

export default function Career() {
  const [paths, setPaths] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchPaths = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await careerService.getCareerPaths();
      setPaths(data || []);
    } catch (e) {
      setError("Failed to load career paths. Make sure your profile is complete.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchPaths(); }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-purple-400" />
            Career Paths
          </h1>
          <p className="text-sm text-muted mt-1">
            AI-generated trajectories tailored to your skills and goals.
          </p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={fetchPaths}
          disabled={loading}
          className="flex items-center gap-2 text-xs border-slate-800"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
          Regenerate
        </Button>
      </div>

      {/* Info banner */}
      <div className="bg-purple-950/30 border border-purple-500/20 rounded-2xl p-4 flex gap-3 items-start">
        <Sparkles className="w-4 h-4 text-purple-400 shrink-0 mt-0.5 animate-pulse" />
        <div>
          <p className="text-xs font-bold text-purple-300 uppercase tracking-wider">AI Career Intelligence</p>
          <p className="text-sm text-slate-300 mt-0.5 leading-relaxed">
            These paths are dynamically generated based on your current skills, experience, and stated goals. Click any milestone step to explore it in detail.
          </p>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-danger/10 border border-danger/20 text-danger text-sm px-4 py-3 rounded-xl">
          {error}
        </div>
      )}

      {/* Loading skeleton */}
      {loading && (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-card/60 border border-border/80 rounded-2xl p-6 animate-pulse h-52" />
          ))}
        </div>
      )}

      {/* Path cards */}
      {!loading && !error && (
        <div className="space-y-5">
          {paths.length === 0 ? (
            <div className="text-center py-16 text-muted">
              <Map className="w-10 h-10 mx-auto mb-3 opacity-30" />
              <p className="text-sm font-medium">No career paths generated yet.</p>
              <p className="text-xs mt-1">Complete your profile with skills and goals to unlock personalized paths.</p>
            </div>
          ) : (
            paths.map((path, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
              >
                <PathCard path={path} index={i} />
              </motion.div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
