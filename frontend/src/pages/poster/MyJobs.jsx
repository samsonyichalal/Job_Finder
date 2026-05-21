import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Trash2, RefreshCw } from "lucide-react";
import careerService from "../../services/careerService";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";

export default function MyJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchJobs = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await careerService.getPosterJobs();
      setJobs(data || []);
    } catch {
      setError("Failed to load your jobs.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleDelete = async (jobId) => {
    await careerService.deletePosterJob(jobId);
    setJobs((prev) => prev.filter((job) => job.id !== jobId));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight">My Jobs</h1>
          <p className="text-sm text-muted mt-1">Review and remove jobs you posted.</p>
        </div>
        <Button variant="ghost" size="sm" onClick={fetchJobs} className="flex items-center gap-2 text-xs border-slate-800">
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </div>

      {error && <div className="bg-danger/10 border border-danger/20 text-danger text-sm px-4 py-3 rounded-xl">{error}</div>}

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-card/60 border border-border/80 rounded-2xl p-6 animate-pulse h-32" />
          ))}
        </div>
      ) : jobs.length === 0 ? (
        <Card className="p-6 text-center text-muted">No jobs posted yet.</Card>
      ) : (
        <div className="space-y-4">
          {jobs.map((job, index) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="p-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white">{job.title}</h3>
                  <p className="text-sm text-muted">{job.company_name || job.industry} · {job.location} · {job.work_type}</p>
                  <p className="text-xs text-slate-400 mt-2 line-clamp-2">{job.description}</p>
                </div>
                <Button variant="ghost" size="sm" onClick={() => handleDelete(job.id)} className="flex items-center gap-2 text-xs border-slate-800 text-rose-300 hover:text-rose-200">
                  <Trash2 className="w-3.5 h-3.5" />
                  Delete
                </Button>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}