import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Briefcase, RefreshCw, Search, SlidersHorizontal } from "lucide-react";
import careerService from "../services/careerService";
import JobCard from "../components/cards/JobCard";
import Button from "../components/ui/Button";

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [filterLevel, setFilterLevel] = useState("All");

  const levels = ["All", "Entry", "Mid", "Senior", "Lead"];

  const fetchJobs = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await careerService.getJobMatches();
      setJobs(data || []);
      setFiltered(data || []);
    } catch (e) {
      setError("Failed to load job matches. Make sure your profile is complete.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchJobs(); }, []);

  useEffect(() => {
    let result = [...jobs];
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (j) =>
          j.job.title.toLowerCase().includes(q) ||
          j.job.industry.toLowerCase().includes(q) ||
          j.job.location.toLowerCase().includes(q)
      );
    }
    if (filterLevel !== "All") {
      result = result.filter((j) =>
        j.job.seniority_level?.toLowerCase().includes(filterLevel.toLowerCase())
      );
    }
    setFiltered(result);
  }, [search, filterLevel, jobs]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <Briefcase className="w-6 h-6 text-indigo-400" />
            Job Matches
          </h1>
          <p className="text-sm text-muted mt-1">
            AI-scored matches ranked by your skill alignment.
          </p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={fetchJobs}
          disabled={loading}
          className="flex items-center gap-2 text-xs border-slate-800"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted pointer-events-none" />
          <input
            type="text"
            placeholder="Search by title, industry, or location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-card/60 border border-border/80 rounded-xl pl-10 pr-4 py-2.5 text-sm text-text placeholder-muted focus:outline-none focus:border-primary/50 transition-colors"
          />
        </div>
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-muted shrink-0" />
          <div className="flex gap-1.5">
            {levels.map((lvl) => (
              <button
                key={lvl}
                onClick={() => setFilterLevel(lvl)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                  filterLevel === lvl
                    ? "bg-primary/10 border-primary/40 text-white"
                    : "bg-card/40 border-border/60 text-muted hover:text-white hover:border-slate-700"
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results count */}
      {!loading && !error && (
        <p className="text-xs text-muted font-medium">
          Showing <span className="text-white font-bold">{filtered.length}</span> of {jobs.length} matches
        </p>
      )}

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
            <div key={i} className="bg-card/60 border border-border/80 rounded-2xl p-6 animate-pulse h-40" />
          ))}
        </div>
      )}

      {/* Job cards */}
      {!loading && !error && (
        <div className="space-y-4">
          {filtered.length === 0 ? (
            <div className="text-center py-16 text-muted">
              <Briefcase className="w-10 h-10 mx-auto mb-3 opacity-30" />
              <p className="text-sm font-medium">No matches found for your filters.</p>
              <p className="text-xs mt-1">Try adjusting your search or level filter.</p>
            </div>
          ) : (
            filtered.map((jobMatch, i) => (
              <motion.div
                key={jobMatch.job.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.3 }}
              >
                <JobCard jobMatch={jobMatch} />
              </motion.div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
