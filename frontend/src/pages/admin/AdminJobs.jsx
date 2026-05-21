import React, { useEffect, useState } from "react";
import careerService from "../../services/careerService";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";

export default function AdminJobs() {
  const [jobs, setJobs] = useState([]);

  const load = async () => {
    const data = await careerService.getAdminJobs();
    setJobs(data || []);
  };

  useEffect(() => {
    load();
  }, []);

  const remove = async (jobId) => {
    await careerService.deleteAdminJob(jobId);
    setJobs((prev) => prev.filter((job) => job.id !== jobId));
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-black text-white tracking-tight">Manage Jobs</h1>
      <div className="space-y-3">
        {jobs.map((job) => (
          <Card key={job.id} className="p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div>
              <p className="text-white font-semibold">{job.title}</p>
              <p className="text-xs text-muted">{job.company_name || job.industry} · {job.location}</p>
            </div>
            <Button variant="ghost" size="sm" onClick={() => remove(job.id)} className="text-rose-300">
              Delete
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}