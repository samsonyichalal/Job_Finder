import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PlusCircle } from "lucide-react";
import careerService from "../../services/careerService";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

export default function PostJob() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    title: "",
    company_name: "",
    industry: "Tech",
    location: "",
    work_type: "remote",
    seniority_level: "mid",
    salary_min: "",
    salary_max: "",
    currency: "USD",
    description: "",
    required_skills_json: "",
    nice_skills_json: "",
  });

  const set = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.company_name.trim()) {
      setError("Title and company name are required.");
      return;
    }
    setSaving(true);
    setError("");
    try {
      await careerService.createPosterJob({
        ...form,
        salary_min: Number(form.salary_min) || 0,
        salary_max: Number(form.salary_max) || 0,
        required_skills_json: form.required_skills_json.split(",").map((item) => item.trim()).filter(Boolean),
        nice_skills_json: form.nice_skills_json.split(",").map((item) => item.trim()).filter(Boolean),
      });
      navigate("/poster/jobs");
    } catch (err) {
      setError(err?.response?.data?.detail || "Failed to create job.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
          <PlusCircle className="w-6 h-6 text-indigo-400" />
          Post a New Job
        </h1>
        <p className="text-sm text-muted mt-1">Create a new job listing that will be stored in SQLite and available to seekers.</p>
      </div>

      <Card className="p-6">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="Job Title" value={form.title} onChange={(e) => set("title", e.target.value)} />
            <Input label="Company Name" value={form.company_name} onChange={(e) => set("company_name", e.target.value)} />
            <Input label="Industry" value={form.industry} onChange={(e) => set("industry", e.target.value)} />
            <Input label="Location" value={form.location} onChange={(e) => set("location", e.target.value)} />
            <Input label="Work Type" value={form.work_type} onChange={(e) => set("work_type", e.target.value)} />
            <Input label="Seniority" value={form.seniority_level} onChange={(e) => set("seniority_level", e.target.value)} />
            <Input label="Salary Min" type="number" value={form.salary_min} onChange={(e) => set("salary_min", e.target.value)} />
            <Input label="Salary Max" type="number" value={form.salary_max} onChange={(e) => set("salary_max", e.target.value)} />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">Description</label>
            <textarea
              rows={5}
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 text-slate-200 placeholder-slate-500 rounded-xl p-3 text-sm focus:outline-none focus:border-primary/50 transition-all resize-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Required Skills"
              placeholder="React, TypeScript, SQL"
              value={form.required_skills_json}
              onChange={(e) => set("required_skills_json", e.target.value)}
            />
            <Input
              label="Nice-to-Have Skills"
              placeholder="Docker, AWS, Git"
              value={form.nice_skills_json}
              onChange={(e) => set("nice_skills_json", e.target.value)}
            />
          </div>

          {error && <div className="bg-danger/10 border border-danger/20 text-danger text-sm px-4 py-3 rounded-xl">{error}</div>}

          <Button type="submit" variant="primary" disabled={saving} className="w-full py-3 font-bold">
            {saving ? "Publishing..." : "Publish Job"}
          </Button>
        </form>
      </Card>
    </div>
  );
}