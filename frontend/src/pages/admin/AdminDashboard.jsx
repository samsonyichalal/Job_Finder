import React, { useEffect, useState } from "react";
import { Shield } from "lucide-react";
import careerService from "../../services/careerService";
import Card from "../../components/ui/Card";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const load = async () => {
      const data = await careerService.getAdminStats();
      setStats(data);
    };
    load();
  }, []);

  const items = [
    { label: "Users", value: stats?.users_total ?? "—" },
    { label: "Job Finders", value: stats?.job_finders ?? "—" },
    { label: "Job Posters", value: stats?.job_posters ?? "—" },
    { label: "Admins", value: stats?.admins ?? "—" },
    { label: "Jobs", value: stats?.jobs ?? "—" },
    { label: "Courses", value: stats?.courses ?? "—" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
          <Shield className="w-6 h-6 text-indigo-400" />
          Admin Dashboard
        </h1>
        <p className="text-sm text-muted mt-1">System overview from live SQLite data.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {items.map((item) => (
          <Card key={item.label} className="p-5">
            <p className="text-xs uppercase tracking-wider text-muted font-bold">{item.label}</p>
            <p className="text-3xl font-black text-white mt-2">{item.value}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}