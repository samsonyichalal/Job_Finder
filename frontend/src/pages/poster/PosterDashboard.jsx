import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Briefcase, PlusCircle, ClipboardList, TrendingUp } from "lucide-react";
import careerService from "../../services/careerService";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import StatusBanner from "../../components/ui/StatusBanner";

export default function PosterDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({ job_count: 0 });
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const [posterStats, posterJobs] = await Promise.all([
          careerService.getPosterStats(),
          careerService.getPosterJobs(),
        ]);
        setStats(posterStats || { job_count: 0 });
        setJobs(posterJobs || []);
      } catch (err) {
        console.error("Poster dashboard load error", err);
        setError("Some employer data could not load right now.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <Briefcase className="w-6 h-6 text-indigo-400" />
            Employer Dashboard
          </h1>
          <p className="text-sm text-muted mt-1">Manage your open roles and create new job posts.</p>
        </div>
        <Button variant="primary" onClick={() => navigate("/poster/post-job")} className="flex items-center gap-2">
          <PlusCircle className="w-4 h-4" />
          Post a Job
        </Button>
      </div>

      {error && (
        <StatusBanner
          tone="warning"
          title="Partial employer dashboard data"
          message={error}
          actionLabel="Retry"
          onAction={() => window.location.reload()}
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-5">
          <p className="text-xs uppercase tracking-wider text-muted font-bold">Open Roles</p>
          <p className="text-3xl font-black text-white mt-2">{loading ? "—" : stats.job_count}</p>
        </Card>
        <Card className="p-5">
          <p className="text-xs uppercase tracking-wider text-muted font-bold">Recent Activity</p>
          <p className="text-sm text-slate-300 mt-2">Create roles, edit listings, and keep your pipeline active.</p>
        </Card>
        <Card className="p-5">
          <p className="text-xs uppercase tracking-wider text-muted font-bold">Quick Actions</p>
          <div className="flex gap-2 mt-3">
            <Button variant="ghost" size="sm" onClick={() => navigate("/poster/jobs")} className="flex items-center gap-2">
              <ClipboardList className="w-3.5 h-3.5" />
              My Jobs
            </Button>
            <Button variant="ghost" size="sm" onClick={() => navigate("/poster/post-job")} className="flex items-center gap-2">
              <TrendingUp className="w-3.5 h-3.5" />
              New Role
            </Button>
          </div>
        </Card>
      </div>

      <Card className="p-5">
        <h2 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Recent Posted Jobs</h2>
        {loading ? (
          <div className="h-32 bg-slate-900/40 rounded-xl animate-pulse" />
        ) : jobs.length === 0 ? (
          <div className="text-center py-10 border border-dashed border-border/70 rounded-xl bg-card/40">
            <p className="text-sm text-white font-semibold">No posted jobs yet</p>
            <p className="text-xs text-muted mt-1 max-w-sm mx-auto">
              Post your first role to start tracking applicants and managing your pipeline.
            </p>
            <Button variant="primary" size="sm" onClick={() => navigate("/poster/post-job")} className="mt-4">
              Post your first job
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {jobs.slice(0, 3).map((job) => (
              <div key={job.id} className="flex items-center justify-between gap-3 bg-slate-950/40 border border-slate-800 rounded-xl p-4">
                <div>
                  <h3 className="font-semibold text-white">{job.title}</h3>
                  <p className="text-xs text-muted">{job.company_name || job.industry} · {job.location} · {job.work_type}</p>
                </div>
                <span className="text-xs px-2 py-1 rounded-lg bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">{job.seniority_level}</span>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}