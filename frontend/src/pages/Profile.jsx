import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  User, MapPin, Briefcase, DollarSign, Target, GraduationCap,
  Building2, Plus, Trash2, Save, CheckCircle2, AlertCircle
} from "lucide-react";
import useAuth from "../hooks/useAuth";
import careerService from "../services/careerService";
import SkillsInput from "../components/forms/SkillsInput";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import formatSalary from "../utils/formatSalary";

const WORK_PREFS = ["remote", "hybrid", "onsite"];
const SECTIONS = ["Personal", "Skills", "Experience", "Education", "Goals"];

export default function Profile() {
  const { user, setUser } = useAuth();
  const [activeSection, setActiveSection] = useState("Personal");
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    full_name: "",
    location: "",
    work_preference: "remote",
    skills_json: [],
    education_json: [],
    experience_json: [],
    interests_json: [],
    short_term_goal: "",
    long_term_goal: "",
    current_salary: "",
    desired_salary: "",
    currency: "USD",
  });

  // Populate form from user profile
  useEffect(() => {
    if (user) {
      setForm({
        full_name: user.full_name || "",
        location: user.location || "",
        work_preference: user.work_preference || "remote",
        skills_json: user.skills || [],
        education_json: user.education || [],
        experience_json: user.experience || [],
        interests_json: user.interests || [],
        short_term_goal: user.short_term_goal || "",
        long_term_goal: user.long_term_goal || "",
        current_salary: user.current_salary ? String(user.current_salary) : "",
        desired_salary: user.desired_salary ? String(user.desired_salary) : "",
        currency: user.currency || "USD",
      });
    }
  }, [user]);

  const set = (key, val) => setForm((p) => ({ ...p, [key]: val }));

  const addEdu = () =>
    set("education_json", [
      ...form.education_json,
      { school: "", degree: "", field_of_study: "", start_year: "", end_year: "" },
    ]);
  const updateEdu = (i, field, val) => {
    const arr = [...form.education_json];
    arr[i] = { ...arr[i], [field]: val };
    set("education_json", arr);
  };
  const removeEdu = (i) =>
    set("education_json", form.education_json.filter((_, idx) => idx !== i));

  const addExp = () =>
    set("experience_json", [
      ...form.experience_json,
      { company: "", role: "", start_year: "", end_year: "", description: "" },
    ]);
  const updateExp = (i, field, val) => {
    const arr = [...form.experience_json];
    arr[i] = { ...arr[i], [field]: val };
    set("experience_json", arr);
  };
  const removeExp = (i) =>
    set("experience_json", form.experience_json.filter((_, idx) => idx !== i));

  const handleSave = async () => {
    if (!form.full_name.trim()) { setError("Full name is required."); return; }
    setSaving(true);
    setError("");
    setSuccess(false);
    try {
      const payload = {
        ...form,
        current_salary: parseFloat(form.current_salary) || 0,
        desired_salary: parseFloat(form.desired_salary) || 0,
      };
      await careerService.saveProfile(payload);
      const updated = await careerService.getProfile();
      if (setUser) setUser(updated);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (e) {
      setError(e?.response?.data?.detail || "Failed to save profile.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <User className="w-6 h-6 text-indigo-400" />
            My Profile
          </h1>
          <p className="text-sm text-muted mt-1">
            Keep your profile updated for the most accurate job matches and recommendations.
          </p>
        </div>
        <Button
          variant="primary"
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 text-sm font-bold"
        >
          {saving ? (
            <>
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              Save Changes
            </>
          )}
        </Button>
      </div>

      {/* Status messages */}
      {success && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 bg-success/10 border border-success/20 text-success text-sm px-4 py-3 rounded-xl"
        >
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          Profile saved successfully!
        </motion.div>
      )}
      {error && (
        <div className="flex items-center gap-2 bg-danger/10 border border-danger/20 text-danger text-sm px-4 py-3 rounded-xl">
          <AlertCircle className="w-4 h-4 shrink-0" />
          {error}
        </div>
      )}

      {/* Section nav */}
      <div className="flex gap-1 flex-wrap bg-card/60 border border-border/80 rounded-xl p-1 w-fit">
        {SECTIONS.map((s) => (
          <button
            key={s}
            onClick={() => setActiveSection(s)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              activeSection === s
                ? "bg-primary/10 text-white border border-primary/20"
                : "text-muted hover:text-white"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Section content */}
      <motion.div
        key={activeSection}
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.25 }}
      >
        {/* Personal */}
        {activeSection === "Personal" && (
          <Card className="p-6 space-y-5">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <User className="w-4 h-4 text-indigo-400" /> Personal Information
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Full Name"
                placeholder="Jane Smith"
                value={form.full_name}
                onChange={(e) => set("full_name", e.target.value)}
              />
              <div className="relative">
                <MapPin className="absolute left-3 top-[38px] w-4 h-4 text-muted pointer-events-none" />
                <Input
                  label="Location"
                  placeholder="San Francisco, USA"
                  value={form.location}
                  onChange={(e) => set("location", e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Work Preference
              </label>
              <div className="flex gap-3">
                {WORK_PREFS.map((pref) => (
                  <button
                    key={pref}
                    type="button"
                    onClick={() => set("work_preference", pref)}
                    className={`flex-1 py-2.5 rounded-xl border text-sm font-semibold capitalize transition-all ${
                      form.work_preference === pref
                        ? "bg-primary/10 border-primary/40 text-white"
                        : "bg-slate-950/40 border-slate-800 text-muted hover:text-white hover:border-slate-700"
                    }`}
                  >
                    {pref}
                  </button>
                ))}
              </div>
            </div>
          </Card>
        )}

        {/* Skills */}
        {activeSection === "Skills" && (
          <Card className="p-6 space-y-5">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Target className="w-4 h-4 text-amber-400" /> Skills & Interests
            </h2>
            <SkillsInput
              label="Your Skills"
              value={form.skills_json}
              onChange={(val) => set("skills_json", val)}
            />
            <SkillsInput
              label="Interests (optional)"
              value={form.interests_json}
              onChange={(val) => set("interests_json", val)}
            />
          </Card>
        )}

        {/* Experience */}
        {activeSection === "Experience" && (
          <Card className="p-6 space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Building2 className="w-4 h-4 text-purple-400" /> Work Experience
              </h2>
              <Button variant="ghost" size="sm" onClick={addExp} className="text-xs flex items-center gap-1 text-primary">
                <Plus className="w-3.5 h-3.5" /> Add
              </Button>
            </div>
            {form.experience_json.length === 0 && (
              <p className="text-xs text-muted italic border border-dashed border-slate-800 rounded-xl p-4 text-center">
                No experience added yet.
              </p>
            )}
            {form.experience_json.map((exp, i) => (
              <div key={i} className="bg-slate-950/40 border border-slate-800 rounded-xl p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-indigo-400">Experience #{i + 1}</span>
                  <button onClick={() => removeExp(i)} className="text-muted hover:text-danger transition-colors">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Input label="Company" placeholder="Google" value={exp.company} onChange={(e) => updateExp(i, "company", e.target.value)} />
                  <Input label="Role" placeholder="Software Engineer" value={exp.role} onChange={(e) => updateExp(i, "role", e.target.value)} />
                  <Input label="Start Year" placeholder="2020" value={exp.start_year} onChange={(e) => updateExp(i, "start_year", e.target.value)} />
                  <Input label="End Year" placeholder="2023 or Present" value={exp.end_year} onChange={(e) => updateExp(i, "end_year", e.target.value)} />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">Description</label>
                  <textarea
                    rows={2}
                    placeholder="Brief description of your responsibilities..."
                    value={exp.description}
                    onChange={(e) => updateExp(i, "description", e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 text-slate-200 placeholder-slate-500 rounded-xl p-3 text-sm focus:outline-none focus:border-primary/50 transition-all resize-none"
                  />
                </div>
              </div>
            ))}
          </Card>
        )}

        {/* Education */}
        {activeSection === "Education" && (
          <Card className="p-6 space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-emerald-400" /> Education
              </h2>
              <Button variant="ghost" size="sm" onClick={addEdu} className="text-xs flex items-center gap-1 text-primary">
                <Plus className="w-3.5 h-3.5" /> Add
              </Button>
            </div>
            {form.education_json.length === 0 && (
              <p className="text-xs text-muted italic border border-dashed border-slate-800 rounded-xl p-4 text-center">
                No education added yet.
              </p>
            )}
            {form.education_json.map((edu, i) => (
              <div key={i} className="bg-slate-950/40 border border-slate-800 rounded-xl p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-indigo-400">Education #{i + 1}</span>
                  <button onClick={() => removeEdu(i)} className="text-muted hover:text-danger transition-colors">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Input label="School" placeholder="MIT" value={edu.school} onChange={(e) => updateEdu(i, "school", e.target.value)} />
                  <Input label="Degree" placeholder="B.Sc." value={edu.degree} onChange={(e) => updateEdu(i, "degree", e.target.value)} />
                  <Input label="Field of Study" placeholder="Computer Science" value={edu.field_of_study} onChange={(e) => updateEdu(i, "field_of_study", e.target.value)} />
                  <div className="grid grid-cols-2 gap-2">
                    <Input label="Start Year" placeholder="2018" value={edu.start_year} onChange={(e) => updateEdu(i, "start_year", e.target.value)} />
                    <Input label="End Year" placeholder="2022" value={edu.end_year} onChange={(e) => updateEdu(i, "end_year", e.target.value)} />
                  </div>
                </div>
              </div>
            ))}
          </Card>
        )}

        {/* Goals */}
        {activeSection === "Goals" && (
          <Card className="p-6 space-y-5">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Target className="w-4 h-4 text-rose-400" /> Career Goals & Salary
            </h2>
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Short-Term Goal (1–2 years)
              </label>
              <textarea
                rows={3}
                placeholder="e.g. Land a senior backend engineer role at a Series B startup"
                value={form.short_term_goal}
                onChange={(e) => set("short_term_goal", e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 text-slate-200 placeholder-slate-500 rounded-xl p-3 text-sm focus:outline-none focus:border-primary/50 transition-all resize-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Long-Term Goal (5+ years)
              </label>
              <textarea
                rows={3}
                placeholder="e.g. Become a CTO or start my own tech company"
                value={form.long_term_goal}
                onChange={(e) => set("long_term_goal", e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 text-slate-200 placeholder-slate-500 rounded-xl p-3 text-sm focus:outline-none focus:border-primary/50 transition-all resize-none"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="relative">
                <DollarSign className="absolute left-3 top-[38px] w-4 h-4 text-muted pointer-events-none" />
                <Input
                  label="Current Salary (USD)"
                  type="number"
                  placeholder="75000"
                  value={form.current_salary}
                  onChange={(e) => set("current_salary", e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="relative">
                <DollarSign className="absolute left-3 top-[38px] w-4 h-4 text-muted pointer-events-none" />
                <Input
                  label="Desired Salary (USD)"
                  type="number"
                  placeholder="120000"
                  value={form.desired_salary}
                  onChange={(e) => set("desired_salary", e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            {(form.current_salary || form.desired_salary) && (
              <div className="bg-emerald-950/20 border border-emerald-500/20 rounded-xl p-4 flex items-center gap-3">
                <Briefcase className="w-4 h-4 text-emerald-400 shrink-0" />
                <div className="text-sm">
                  <span className="text-muted">Salary gap: </span>
                  <span className="text-emerald-400 font-bold">
                    {formatSalary(
                      Math.max(0, (parseFloat(form.desired_salary) || 0) - (parseFloat(form.current_salary) || 0))
                    )}
                  </span>
                  <span className="text-muted"> to reach your target</span>
                </div>
              </div>
            )}
          </Card>
        )}
      </motion.div>

      {/* Save button at bottom */}
      <div className="flex justify-end pt-2">
        <Button
          variant="primary"
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 text-sm font-bold px-8"
        >
          {saving ? (
            <>
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              Save Changes
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
