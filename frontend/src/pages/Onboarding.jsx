import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Compass, Plus, Trash2, Sparkles } from "lucide-react";
import useAuth from "../hooks/useAuth";
import careerService from "../services/careerService";
import StepWizard from "../components/forms/StepWizard";
import SkillsInput from "../components/forms/SkillsInput";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

const STEPS = ["Identity", "Skills", "Experience", "Goals"];

const WORK_PREFS = ["remote", "hybrid", "onsite"];

export default function Onboarding() {
  const navigate = useNavigate();
  const { user, setUser } = useAuth();
  const [currentStep, setCurrentStep] = useState(0);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [profile, setProfile] = useState({
    full_name: user?.full_name || "",
    location: user?.location || "",
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

  const set = (key, val) => setProfile((p) => ({ ...p, [key]: val }));

  // Education helpers
  const addEdu = () =>
    set("education_json", [
      ...profile.education_json,
      { school: "", degree: "", field_of_study: "", start_year: "", end_year: "" },
    ]);
  const updateEdu = (i, field, val) => {
    const arr = [...profile.education_json];
    arr[i] = { ...arr[i], [field]: val };
    set("education_json", arr);
  };
  const removeEdu = (i) => set("education_json", profile.education_json.filter((_, idx) => idx !== i));

  // Experience helpers
  const addExp = () =>
    set("experience_json", [
      ...profile.experience_json,
      { company: "", role: "", start_year: "", end_year: "", description: "" },
    ]);
  const updateExp = (i, field, val) => {
    const arr = [...profile.experience_json];
    arr[i] = { ...arr[i], [field]: val };
    set("experience_json", arr);
  };
  const removeExp = (i) => set("experience_json", profile.experience_json.filter((_, idx) => idx !== i));

  const handleFinish = async () => {
    setSaving(true);
    setError("");
    try {
      const payload = {
        ...profile,
        current_salary: parseFloat(profile.current_salary) || 0,
        desired_salary: parseFloat(profile.desired_salary) || 0,
      };
      await careerService.saveProfile(payload);
      const updated = await careerService.getProfile();
      if (setUser) setUser(updated);
      navigate("/dashboard");
    } catch (err) {
      setError(err?.response?.data?.detail || "Failed to save profile. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const isNextDisabled = () => {
    if (currentStep === 0) return !profile.full_name.trim();
    if (currentStep === 1) return profile.skills_json.length === 0;
    return false;
  };

  return (
    <div className="min-h-screen bg-background text-text relative overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-3xl mx-auto px-4 py-12 relative z-10">
        {/* Header */}
        <div className="flex items-center justify-center gap-2 mb-10">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/30">
            <Compass className="w-4.5 h-4.5 text-white animate-spin-slow" />
          </div>
          <span className="text-base font-black tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
            CAREER COMPASS
          </span>
        </div>

        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-bold text-primary mb-4">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            Profile Setup — Step {currentStep + 1} of {STEPS.length}
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight">
            Let's build your profile
          </h1>
          <p className="text-sm text-muted mt-2">
            This powers your personalized job matches, career paths, and skill gap analysis.
          </p>
        </div>

        {error && (
          <div className="bg-danger/10 border border-danger/20 text-danger text-sm px-4 py-3 rounded-xl mb-6 text-center">
            {error}
          </div>
        )}

        <StepWizard
          steps={STEPS}
          currentStep={currentStep}
          onNext={() => {
            if (currentStep < STEPS.length - 1) setCurrentStep((s) => s + 1);
            else handleFinish();
          }}
          onPrev={() => setCurrentStep((s) => Math.max(0, s - 1))}
          isPrevDisabled={currentStep === 0}
          isNextDisabled={isNextDisabled() || saving}
          nextLabel={currentStep === STEPS.length - 1 ? (saving ? "Saving..." : "Launch Dashboard") : "Continue"}
        >
          {/* Step 0: Identity */}
          {currentStep === 0 && (
            <div className="space-y-5">
              <h2 className="text-lg font-bold text-white">Tell us about yourself</h2>
              <Input
                label="Full Name"
                placeholder="Jane Smith"
                value={profile.full_name}
                onChange={(e) => set("full_name", e.target.value)}
              />
              <Input
                label="Location (City, Country)"
                placeholder="San Francisco, USA"
                value={profile.location}
                onChange={(e) => set("location", e.target.value)}
              />
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
                        profile.work_preference === pref
                          ? "bg-primary/10 border-primary/40 text-white"
                          : "bg-slate-950/40 border-slate-800 text-muted hover:text-white hover:border-slate-700"
                      }`}
                    >
                      {pref}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 1: Skills */}
          {currentStep === 1 && (
            <div className="space-y-5">
              <h2 className="text-lg font-bold text-white">What are your skills?</h2>
              <p className="text-sm text-muted">Add at least one skill to get personalized job matches.</p>
              <SkillsInput
                value={profile.skills_json}
                onChange={(val) => set("skills_json", val)}
              />
            </div>
          )}

          {/* Step 2: Experience & Education */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h2 className="text-lg font-bold text-white">Experience & Education</h2>

              {/* Education */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">Education</span>
                  <Button variant="ghost" size="sm" onClick={addEdu} className="text-xs flex items-center gap-1 text-primary hover:text-white">
                    <Plus className="w-3.5 h-3.5" /> Add
                  </Button>
                </div>
                {profile.education_json.length === 0 && (
                  <p className="text-xs text-muted italic border border-dashed border-slate-800 rounded-xl p-4 text-center">
                    No education added. Click "Add" to include your academic background.
                  </p>
                )}
                {profile.education_json.map((edu, i) => (
                  <div key={i} className="bg-slate-950/40 border border-slate-800 rounded-xl p-4 mb-3 space-y-3">
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
              </div>

              {/* Experience */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">Work Experience</span>
                  <Button variant="ghost" size="sm" onClick={addExp} className="text-xs flex items-center gap-1 text-primary hover:text-white">
                    <Plus className="w-3.5 h-3.5" /> Add
                  </Button>
                </div>
                {profile.experience_json.length === 0 && (
                  <p className="text-xs text-muted italic border border-dashed border-slate-800 rounded-xl p-4 text-center">
                    No experience added. Click "Add" to include your work history.
                  </p>
                )}
                {profile.experience_json.map((exp, i) => (
                  <div key={i} className="bg-slate-950/40 border border-slate-800 rounded-xl p-4 mb-3 space-y-3">
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
              </div>
            </div>
          )}

          {/* Step 3: Goals & Salary */}
          {currentStep === 3 && (
            <div className="space-y-5">
              <h2 className="text-lg font-bold text-white">Career goals & salary</h2>
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  Short-Term Goal (1–2 years)
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Land a senior backend engineer role at a Series B startup"
                  value={profile.short_term_goal}
                  onChange={(e) => set("short_term_goal", e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 text-slate-200 placeholder-slate-500 rounded-xl p-3 text-sm focus:outline-none focus:border-primary/50 transition-all resize-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  Long-Term Goal (5+ years)
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Become a CTO or start my own tech company"
                  value={profile.long_term_goal}
                  onChange={(e) => set("long_term_goal", e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 text-slate-200 placeholder-slate-500 rounded-xl p-3 text-sm focus:outline-none focus:border-primary/50 transition-all resize-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Current Salary (USD)"
                  type="number"
                  placeholder="75000"
                  value={profile.current_salary}
                  onChange={(e) => set("current_salary", e.target.value)}
                />
                <Input
                  label="Desired Salary (USD)"
                  type="number"
                  placeholder="120000"
                  value={profile.desired_salary}
                  onChange={(e) => set("desired_salary", e.target.value)}
                />
              </div>
              <SkillsInput
                label="Interests (optional)"
                value={profile.interests_json}
                onChange={(val) => set("interests_json", val)}
              />
            </div>
          )}
        </StepWizard>
      </div>
    </div>
  );
}
