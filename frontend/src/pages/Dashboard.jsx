import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Briefcase, TrendingUp, Award, BookOpen, ArrowRight,
  Sparkles, Target, User, MapPin, DollarSign
} from "lucide-react";
import useAuth from "../hooks/useAuth";
import careerService from "../services/careerService";
import StatCard from "../components/cards/StatCard";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Badge from "../components/ui/Badge";
import formatSalary from "../utils/formatSalary";
import StatusBanner from "../components/ui/StatusBanner";

export default function Dashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [jobs, setJobs] = useState([]);
  const [skillGap, setSkillGap] = useState(null);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const [j, s, c] = await Promise.all([
          careerService.getJobMatches(),
          careerService.getSkillsGap(),
          careerService.getRecommendedCourses(),
        ]);
        setJobs(j || []);
        setSkillGap(s || { has: [], missing: [], partial: [] });
        setCourses(c || []);
      } catch (e) {
        console.error("Dashboard load error", e);
        setError("Some dashboard data could not load. You can still continue using the app, but parts of the dashboard may be incomplete.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const topJob = jobs[0];
  const missingCount = skillGap?.missing?.length || 0;
  const hasCount = skillGap?.has?.length || 0;
  const totalCourses = courses.reduce((acc, g) => acc + (g.courses?.length || 0), 0);

  const firstName = user?.full_name?.split(" ")[0] || "Professional";
  const profileReady = Boolean(user?.profileComplete || user?.skills?.length || user?.education?.length || user?.experience?.length || user?.full_name);
  const profileScore = [user?.full_name, user?.location, user?.skills?.length > 0, user?.education?.length > 0, user?.experience?.length > 0, user?.short_term_goal, user?.long_term_goal]
    .filter(Boolean).length;
  const profilePercent = Math.round((profileScore / 7) * 100);

  const quickLinks = [
    { label: "View Job Matches", path: "/jobs", icon: Briefcase, color: "text-indigo-400", bg: "bg-indigo-500/10 border-indigo-500/20" },
    { label: "Career Paths", path: "/career", icon: TrendingUp, color: "text-purple-400", bg: "bg-purple-500/10 border-purple-500/20" },
    { label: "Skills Gap", path: "/skills", icon: Award, color: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/20" },
    { label: "Browse Courses", path: "/courses", icon: BookOpen, color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20" },
  ];

  const hasDashboardData = Boolean(jobs.length || missingCount || hasCount || totalCourses);

  return (
    <div className="space-y-8">
      {/* Welcome header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight">

      {error && (
        <StatusBanner
          tone="warning"
          title="Partial dashboard data"
          message={error}
          actionLabel="Refresh profile"
          onAction={() => navigate("/profile")}
          secondaryLabel="Retry"
          onSecondaryAction={() => window.location.reload()}
        />
      )}
            Welcome back, {firstName} 👋
          </h1>
          <p className="text-sm text-muted mt-1">
            Here's your career intelligence snapshot for today.
          </p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate("/profile")}
          className="flex items-center gap-2 text-xs border-slate-800 text-muted hover:text-white"
        >
          <User className="w-3.5 h-3.5" />
          Edit Profile
        </Button>
      </motion.div>

      {/* Profile summary strip */}
      {user && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="bg-card/60 border border-border/80 rounded-2xl p-5 flex flex-wrap gap-4 items-center"
        >
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white font-black text-lg shadow-lg shadow-primary/20 shrink-0">
            {firstName.charAt(0)}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-base font-bold text-white truncate">{user.full_name}</h3>
            <div className="flex flex-wrap gap-3 mt-1 text-xs text-muted">
              {user.location && (
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-indigo-400" /> {user.location}
                </span>
              )}
              {user.work_preference && (
                <span className="capitalize flex items-center gap-1">
                  <Briefcase className="w-3 h-3 text-indigo-400" /> {user.work_preference}
                </span>
              )}
              {user.desired_salary > 0 && (
                <span className="flex items-center gap-1">
                  <DollarSign className="w-3 h-3 text-emerald-400" /> Target: {formatSalary(user.desired_salary)}
                </span>
              )}
            </div>
          </div>
          {user.skills && user.skills.length > 0 && (
            <div className="flex flex-wrap gap-1.5 max-w-xs">
              {user.skills.slice(0, 5).map((s, i) => (
                <span key={i} className="text-[10px] px-2 py-0.5 rounded-lg bg-primary/10 text-primary border border-primary/20 font-semibold">
                  {s}
                </span>
              ))}
              {user.skills.length > 5 && (
                <span className="text-[10px] text-muted font-medium px-1">+{user.skills.length - 5}</span>
              )}
            </div>
          )}
        </motion.div>
      )}

      {!profileReady && (
        <StatusBanner
          tone="info"
          title="Complete your profile to unlock better results"
          message="Your dashboard is live, but the AI features will be much stronger once you add skills, experience, and goals."
          actionLabel="Complete profile"
          onAction={() => navigate("/onboarding")}
        />
      )}

      <Card className="p-5 border-dashed border-border/80 bg-card/40">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-muted">Profile completeness</p>
            <h3 className="text-base font-bold text-white mt-1">{profilePercent}% complete</h3>
            <p className="text-sm text-muted mt-1">Add more detail to improve matching, salary estimates, and course recommendations.</p>
          </div>
          <div className="w-full sm:w-56">
            <div className="h-2 rounded-full bg-slate-900 overflow-hidden border border-border/60">
              <div className="h-full bg-gradient-to-r from-primary to-secondary" style={{ width: `${profilePercent}%` }} />
            </div>
            <div className="flex justify-between text-[10px] text-muted font-semibold mt-2">
              <span>Basic</span><span>Ready</span><span>Complete</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Stats row */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.4 }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <StatCard
          label="Job Matches"
          value={loading ? "—" : jobs.length}
          description="Personalized to your profile"
          icon={Briefcase}
          trend={{ type: "positive", value: "Top 10" }}
        />
        <StatCard
          label="Skills You Have"
          value={loading ? "—" : hasCount}
          description="Matched against job requirements"
          icon={Award}
          trend={{ type: "positive", value: "✓ Verified" }}
        />
        <StatCard
          label="Skill Gaps"
          value={loading ? "—" : missingCount}
          description="Skills to bridge for top roles"
          icon={Target}
          trend={{ type: "neutral", value: "To learn" }}
        />
        <StatCard
          label="Courses Available"
          value={loading ? "—" : totalCourses}
          description="Curated to close your gaps"
          icon={BookOpen}
          trend={{ type: "positive", value: "Curated" }}
        />
      </motion.div>

      {/* Quick links */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {quickLinks.map((link) => {
          const Icon = link.icon;
          return (
            <button
              key={link.path}
              onClick={() => navigate(link.path)}
              className={`flex items-center gap-3 p-4 rounded-xl border ${link.bg} hover:scale-[1.02] transition-all duration-200 text-left group`}
            >
              <Icon className={`w-5 h-5 ${link.color} shrink-0`} />
              <span className="text-sm font-semibold text-white group-hover:text-white">{link.label}</span>
              <ArrowRight className="w-3.5 h-3.5 text-muted ml-auto group-hover:translate-x-1 transition-transform" />
            </button>
          );
        })}
      </motion.div>

      {!hasDashboardData && !loading && (
        <Card className="p-6 text-center border-dashed border-border/80 bg-card/40">
          <Sparkles className="w-10 h-10 text-primary mx-auto mb-3" />
          <h3 className="text-base font-bold text-white">Your dashboard is ready to personalize</h3>
          <p className="text-sm text-muted mt-2 max-w-xl mx-auto">
            Complete your profile and explore the sections below to generate meaningful AI insights.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-4">
            <Button variant="primary" onClick={() => navigate("/onboarding")}>Complete profile</Button>
            <Button variant="ghost" onClick={() => navigate("/jobs")}>View matches</Button>
          </div>
        </Card>
      )}

      {/* Top job match + skill gaps side by side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top job match */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.4 }}
        >
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">Top Job Match</h2>
            <Button variant="ghost" size="sm" onClick={() => navigate("/jobs")} className="text-xs text-primary hover:text-white flex items-center gap-1 px-0 hover:bg-transparent">
              View all <ArrowRight className="w-3 h-3" />
            </Button>
          </div>
          {loading ? (
            <div className="bg-card/60 border border-border/80 rounded-2xl p-6 animate-pulse h-40" />
          ) : topJob ? (
            <Card className="border-emerald-500/20 bg-slate-900/20 p-5 space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="text-[10px] text-indigo-400 font-bold uppercase tracking-wider">{topJob.job.industry}</span>
                  <h3 className="text-base font-bold text-white mt-0.5">{topJob.job.title}</h3>
                  <p className="text-xs text-muted mt-1">{topJob.job.location} · {topJob.job.work_type}</p>
                </div>
                <div className="text-right shrink-0">
                  <span className={`text-2xl font-black ${topJob.match_score >= 75 ? "text-emerald-400" : "text-indigo-400"}`}>
                    {topJob.match_score}%
                  </span>
                  <Badge variant="success" className="block mt-1 text-center">{topJob.match_label}</Badge>
                </div>
              </div>
              {topJob.explanation && (
                <div className="bg-indigo-950/40 border border-indigo-500/20 rounded-xl p-3 flex gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5 animate-pulse" />
                  <p className="text-xs text-slate-300 italic leading-relaxed">"{topJob.explanation}"</p>
                </div>
              )}
              <Button variant="primary" size="sm" onClick={() => navigate("/jobs")} className="w-full text-xs">
                See Full Analysis
              </Button>
            </Card>
          ) : (
            <Card className="p-6 text-center">
              <p className="text-sm text-muted">No job matches yet. Complete your profile to get started.</p>
              <Button variant="primary" size="sm" onClick={() => navigate("/profile")} className="mt-3">
                Complete Profile
              </Button>
            </Card>
          )}
        </motion.div>

        {/* Skill gaps preview */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">Priority Skill Gaps</h2>
            <Button variant="ghost" size="sm" onClick={() => navigate("/skills")} className="text-xs text-primary hover:text-white flex items-center gap-1 px-0 hover:bg-transparent">
              Full analysis <ArrowRight className="w-3 h-3" />
            </Button>
          </div>
          {loading ? (
            <div className="bg-card/60 border border-border/80 rounded-2xl p-6 animate-pulse h-40" />
          ) : (
            <Card className="p-5 space-y-3">
              {skillGap?.missing?.length > 0 ? (
                <>
                  {skillGap.missing.slice(0, 5).map((gap, i) => (
                    <div key={i} className="flex items-center justify-between gap-3 py-2 border-b border-slate-800/60 last:border-0">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full shrink-0 ${gap.priority === "High" ? "bg-rose-400" : "bg-amber-400"}`} />
                        <span className="text-sm font-semibold text-white">{gap.skill}</span>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-[10px] text-muted">{gap.learn_time}</span>
                        <Badge variant={gap.priority === "High" ? "danger" : "warning"} className="text-[10px]">
                          {gap.priority}
                        </Badge>
                      </div>
                    </div>
                  ))}
                  <Button variant="ghost" size="sm" onClick={() => navigate("/courses")} className="w-full text-xs text-primary hover:text-white border-slate-800 mt-1">
                    Find Courses to Bridge Gaps
                  </Button>
                </>
              ) : (
                <div className="text-center py-4">
                  <p className="text-sm text-emerald-400 font-semibold">🎉 No critical skill gaps found!</p>
                  <p className="text-xs text-muted mt-1">You're well-aligned with current job requirements.</p>
                </div>
              )}
            </Card>
          )}
        </motion.div>
      </div>

      {/* Goals section */}
      {(user?.short_term_goal || user?.long_term_goal) && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.4 }}
        >
          <h2 className="text-sm font-bold text-white uppercase tracking-wider mb-3">Your Career Goals</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {user.short_term_goal && (
              <Card className="p-5 border-indigo-500/20 bg-indigo-950/20">
                <span className="text-[10px] text-indigo-400 font-bold uppercase tracking-wider">Short-Term (1–2 years)</span>
                <p className="text-sm text-slate-200 mt-2 leading-relaxed">{user.short_term_goal}</p>
              </Card>
            )}
            {user.long_term_goal && (
              <Card className="p-5 border-purple-500/20 bg-purple-950/20">
                <span className="text-[10px] text-purple-400 font-bold uppercase tracking-wider">Long-Term (5+ years)</span>
                <p className="text-sm text-slate-200 mt-2 leading-relaxed">{user.long_term_goal}</p>
              </Card>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
}
