import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Compass, Mail, Lock, User, ArrowRight, AlertCircle,
  Eye, EyeOff, CheckCircle2, Sparkles, Target, FileText, BookOpen, TrendingUp
} from "lucide-react";
import useAuth from "../hooks/useAuth";
import Button from "../components/ui/Button";

export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [form, setForm] = useState({ full_name: "", email: "", password: "", confirm: "", role: "job_finder" });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
  };

  const validate = () => {
    if (!form.full_name.trim()) return "Please enter your full name.";
    if (!form.email.trim()) return "Please enter your email.";
    if (form.password.length < 6) return "Password must be at least 6 characters.";
    if (form.password !== form.confirm) return "Passwords do not match.";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validate();
    if (validationError) { setError(validationError); return; }
    setIsLoading(true);
    try {
      const profile = await register(form.email, form.password, form.full_name, form.role);
      if (profile?.role === "admin" || form.role === "admin") {
        navigate("/admin/dashboard");
      } else if (profile?.role === "job_poster" || form.role === "job_poster") {
        navigate("/poster/dashboard");
      } else {
        navigate("/onboarding");
      }
    } catch (err) {
      setError(err?.response?.data?.detail || "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const perks = [
    { icon: Target, label: "AI-powered job matching", color: "text-indigo-400" },
    { icon: TrendingUp, label: "Personalized career roadmaps", color: "text-purple-400" },
    { icon: FileText, label: "Resume ATS optimizer", color: "text-emerald-400" },
    { icon: BookOpen, label: "Skill gap analysis & courses", color: "text-amber-400" },
  ];

  // Password strength
  const strength = (() => {
    const p = form.password;
    if (!p) return null;
    let score = 0;
    if (p.length >= 8) score++;
    if (/[A-Z]/.test(p)) score++;
    if (/[0-9]/.test(p)) score++;
    if (/[^A-Za-z0-9]/.test(p)) score++;
    if (score <= 1) return { label: "Weak", color: "bg-rose-500", width: "25%" };
    if (score === 2) return { label: "Fair", color: "bg-amber-500", width: "50%" };
    if (score === 3) return { label: "Good", color: "bg-indigo-500", width: "75%" };
    return { label: "Strong", color: "bg-emerald-500", width: "100%" };
  })();

  return (
    <div className="min-h-screen bg-[#0F0E1A] flex">
      {/* Left panel — branding */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden flex-col justify-between p-12">
        <div className="absolute top-[-20%] left-[-20%] w-[70%] h-[70%] bg-purple-500/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-[-20%] right-[-20%] w-[60%] h-[60%] bg-indigo-500/15 rounded-full blur-[140px] pointer-events-none" />

        {/* Logo */}
        <div className="relative z-10 flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
            <Compass className="w-4.5 h-4.5 text-white animate-spin-slow" />
          </div>
          <span className="text-base font-black tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
            CAREER COMPASS
          </span>
        </div>

        {/* Center */}
        <div className="relative z-10 space-y-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-xs font-bold text-purple-400">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" /> Free forever · No credit card
            </div>
            <h1 className="text-4xl font-black text-white leading-tight tracking-tight">
              Your AI-powered<br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-400">
                career co-pilot.
              </span>
            </h1>
            <p className="text-slate-400 text-base leading-relaxed max-w-sm">
              Join thousands of professionals navigating smarter career decisions with data-driven insights.
            </p>
          </div>

          <div className="space-y-3">
            {perks.map((perk, i) => {
              const Icon = perk.icon;
              return (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-900/60 border border-slate-800 flex items-center justify-center shrink-0">
                    <Icon className={`w-4 h-4 ${perk.color}`} />
                  </div>
                  <span className="text-sm text-slate-300 font-medium">{perk.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Stats */}
        <div className="relative z-10 grid grid-cols-3 gap-4">
          {[
            { value: "10K+", label: "Users" },
            { value: "98%", label: "Accuracy" },
            { value: "4.9★", label: "Rating" },
          ].map((s, i) => (
            <div key={i} className="bg-slate-900/40 border border-slate-800/60 rounded-xl p-3 text-center">
              <p className="text-lg font-black bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">{s.value}</p>
              <p className="text-[10px] text-slate-400 font-medium mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Right panel — form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12 overflow-y-auto relative">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-500/8 rounded-full blur-[120px] pointer-events-none lg:hidden" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md relative z-10"
        >
          {/* Mobile logo */}
          <div className="flex items-center justify-center gap-2 mb-8 lg:hidden">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <Compass className="w-4.5 h-4.5 text-white animate-spin-slow" />
            </div>
            <span className="text-base font-black tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
              CAREER COMPASS
            </span>
          </div>

          <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800/80 rounded-2xl p-8 shadow-2xl">
            <div className="mb-7">
              <h2 className="text-2xl font-black text-white tracking-tight">Create your account</h2>
              <p className="text-sm text-slate-400 mt-1">
                Already have an account?{" "}
                <Link to="/login" className="text-indigo-400 hover:text-indigo-300 font-semibold transition-colors">
                  Sign in
                </Link>
              </p>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm px-4 py-3 rounded-xl mb-5"
              >
                <AlertCircle className="w-4 h-4 shrink-0" />
                {error}
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">I want to use Career Compass as</label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { value: "job_finder", label: "Job Finder" },
                    { value: "job_poster", label: "Job Poster" },
                  ].map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setForm((prev) => ({ ...prev, role: option.value }))}
                      className={`py-3 rounded-xl border text-sm font-semibold transition-all ${
                        form.role === option.value
                          ? "bg-indigo-500/10 border-indigo-500/40 text-white"
                          : "bg-slate-950/80 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Full name */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
                  <input
                    name="full_name"
                    type="text"
                    placeholder="Jane Smith"
                    value={form.full_name}
                    onChange={handleChange}
                    autoComplete="name"
                    className="w-full bg-slate-950/80 border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/20 transition-all"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
                  <input
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={handleChange}
                    autoComplete="email"
                    className="w-full bg-slate-950/80 border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/20 transition-all"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Min. 6 characters"
                    value={form.password}
                    onChange={handleChange}
                    autoComplete="new-password"
                    className="w-full bg-slate-950/80 border border-slate-800 rounded-xl pl-10 pr-11 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/20 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {/* Password strength bar */}
                {strength && (
                  <div className="space-y-1 pt-1">
                    <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full rounded-full ${strength.color}`}
                        initial={{ width: 0 }}
                        animate={{ width: strength.width }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                    <p className="text-[10px] text-slate-500 font-medium">
                      Password strength: <span className="text-slate-300 font-bold">{strength.label}</span>
                    </p>
                  </div>
                )}
              </div>

              {/* Confirm password */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
                  <input
                    name="confirm"
                    type={showConfirm ? "text" : "password"}
                    placeholder="Repeat your password"
                    value={form.confirm}
                    onChange={handleChange}
                    autoComplete="new-password"
                    className="w-full bg-slate-950/80 border border-slate-800 rounded-xl pl-10 pr-11 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/20 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                  >
                    {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                  {/* Match indicator */}
                  {form.confirm && (
                    <div className="absolute right-10 top-1/2 -translate-y-1/2">
                      {form.password === form.confirm ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-rose-400" />
                      )}
                    </div>
                  )}
                </div>
              </div>

              <Button
                type="submit"
                variant="primary"
                className="w-full py-3.5 font-bold text-sm flex items-center justify-center gap-2 group mt-2"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Creating account...
                  </>
                ) : (
                  <>
                    Create Account
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </Button>

              <p className="text-center text-[11px] text-slate-500 pt-1">
                By creating an account you agree to our{" "}
                <a href="#" className="text-slate-400 hover:text-white transition-colors">Terms of Service</a>
                {" "}and{" "}
                <a href="#" className="text-slate-400 hover:text-white transition-colors">Privacy Policy</a>.
              </p>
            </form>
          </div>

          <p className="text-center text-xs text-slate-600 mt-6">
            © {new Date().getFullYear()} Career Compass. All rights reserved.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
