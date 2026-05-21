import React, { useEffect, useState } from "react";
import careerService from "../../services/careerService";
import Card from "../../components/ui/Card";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);

  const load = async () => {
    const data = await careerService.getAdminUsers();
    setUsers(data || []);
  };

  useEffect(() => {
    load();
  }, []);

  const updateRole = async (userId, role) => {
    await careerService.updateAdminUserRole(userId, role);
    await load();
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-black text-white tracking-tight">Manage Users</h1>
      <Card className="p-5">
        <div className="space-y-3">
          {users.map((user) => (
            <div key={user.id} className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 border border-slate-800 rounded-xl p-4">
              <div>
                <p className="text-white font-semibold">{user.full_name || "Unnamed user"}</p>
                <p className="text-xs text-muted">{user.email}</p>
              </div>
              <select
                value={user.role}
                onChange={(e) => updateRole(user.id, e.target.value)}
                className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white"
              >
                <option value="job_finder">job_finder</option>
                <option value="job_poster">job_poster</option>
                <option value="admin">admin</option>
              </select>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}