import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Briefcase, PlusCircle, ClipboardList, TrendingUp } from "lucide-react";
import careerService from "../../services/careerService";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";

export default function PosterDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({ job_count: 0 });
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [posterStats, posterJobs] = await Promise.all([
          careerService.getPosterStats(),
          careerService.getPosterJobs(),
        ]);
        setStats(posterStats || { job_count: 0 });
        setJobs(posterJobs || []);
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
          <p className="text-sm text-muted">You have not posted any jobs yet.</p>
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