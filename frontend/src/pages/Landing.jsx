import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Target, FileText, TrendingUp, Sparkles, ArrowRight,
  Map, BookOpen, Star, Users, Zap, Shield, ChevronDown
} from "lucide-react";
import Button from "../components/ui/Button";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { delay, duration: 0.55, ease: "easeOut" },
});

export default function Landing() {
  const navigate = useNavigate();

  const features = [
    {
      icon: Target,
      title: "Intelligent Job Matching",
      description: "Our alignment engine scores your skills against live job profiles, highlighting exact gaps and match percentages.",
      color: "text-indigo-400",
      bg: "bg-indigo-500/10 border-indigo-500/20",
    },
    {
      icon: Map,
      title: "Dynamic Career Pathways",
      description: "Map your long-term professional milestones, timelines, and projected salaries in interactive step-by-step roadmaps.",
      color: "text-purple-400",
      bg: "bg-purple-500/10 border-purple-500/20",
    },
    {
      icon: FileText,
      title: "AI Resume Analyzer",
      description: "Upload or paste your resume to receive an ATS compatibility grade, keyword enhancements, and bullet rewrites.",
      color: "text-emerald-400",
      bg: "bg-emerald-500/10 border-emerald-500/20",
    },
    {
      icon: BookOpen,
      title: "Targeted Course Guide",
      description: "Bridge your verified skill gaps instantly with curated online courses grouped by missing credentials.",
      color: "text-amber-400",
      bg: "bg-amber-500/10 border-amber-500/20",
    },
    {
      icon: TrendingUp,
      title: "Salary Intelligence",
      description: "Get AI-powered salary estimates for any role, location, and seniority level — know your market worth.",
      color: "text-rose-400",
      bg: "bg-rose-500/10 border-rose-500/20",
    },
    {
      icon: Zap,
      title: "Skills Gap Analysis",
      description: "See exactly which skills you have, which you're missing, and how long each takes to learn.",
      color: "text-cyan-400",
      bg: "bg-cyan-500/10 border-cyan-500/20",
    },
  ];

  const stats = [
    { value: "10K+", label: "Professionals" },
    { value: "500+", label: "Job Roles" },
    { value: "98%", label: "Match Accuracy" },
    { value: "4.9★", label: "User Rating" },
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Senior Software Engineer",
      text: "Career Compass helped me identify the exact skills I needed to land my dream role. The job matching is incredibly accurate.",
      avatar: "SC",
    },
    {
      name: "Marcus Johnson",
      role: "Product Manager",
      text: "The resume analyzer caught things I never would have noticed. My ATS score went from 62 to 91 in one session.",
      avatar: "MJ",
    },
    {
      name: "Priya Patel",
      role: "Data Scientist",
      text: "The career path feature gave me a clear 5-year roadmap with realistic salary milestones. Absolutely game-changing.",
      avatar: "PP",
    },
  ];

  const steps = [
    { step: "01", title: "Create your profile", desc: "Add your skills, experience, and career goals in minutes." },
    { step: "02", title: "Get matched instantly", desc: "AI scores your profile against hundreds of live job roles." },
    { step: "03", title: "Bridge your gaps", desc: "Follow curated courses and career paths to reach your goals." },
  ];

  return (
    <div className="text-white overflow-x-hidden" id="top">

      {/* ── Hero ── */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[55%] h-[55%] bg-indigo-500/10 rounded-full blur-[130px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[55%] h-[55%] bg-purple-500/10 rounded-full blur-[130px] pointer-events-none" />
        <div className="absolute top-[40%] left-[30%] w-[40%] h-[40%] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-6xl mx-auto px-6 py-20 w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left */}
            <motion.div
              className="lg:col-span-6 text-center lg:text-left space-y-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-bold text-indigo-400">
                <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                Powered by Advanced AI Intelligence
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
                Chart Your Path.<br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-emerald-400">
                  Own Your Career.
                </span>
              </h1>

              <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-xl mx-auto lg:mx-0">
                Stop guessing your next career move. Navigate your trajectory, identify and bridge technical skill gaps, optimize resumes for ATS, and unlock curated learning — all in one place.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Button
                  variant="primary"
                  onClick={() => navigate("/register")}
                  className="w-full sm:w-auto text-sm font-bold px-8 py-3.5 shadow-lg shadow-indigo-600/25 flex items-center justify-center gap-2 group"
                >
                  Get Started Free
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => navigate("/login")}
                  className="w-full sm:w-auto text-sm font-bold px-8 py-3.5 border-slate-700 text-slate-300 hover:text-white"
                >
                  Sign In
                </Button>
              </div>

              {/* Social proof */}
              <div className="flex items-center justify-center lg:justify-start gap-3 pt-2">
                <div className="flex -space-x-2">
                  {["SC", "MJ", "PP", "AK"].map((init, i) => (
                    <div key={i} className="w-7 h-7 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 border-2 border-[#0F0E1A] flex items-center justify-center text-[9px] font-bold text-white">
                      {init}
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-1 text-xs text-slate-400">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span className="font-bold text-white">4.9</span>
                  <span>from 10,000+ professionals</span>
                </div>
              </div>
            </motion.div>

            {/* Right: Dashboard mockup */}
            <motion.div
              className="lg:col-span-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
            >
              <div className="bg-slate-900/40 border border-slate-800/80 p-6 rounded-2xl shadow-2xl backdrop-blur-md">
                <div className="flex items-center gap-1.5 mb-5">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span className="text-[10px] text-slate-500 font-bold ml-2 tracking-widest uppercase">COMPASS_COPILOT.CONFIG</span>
                </div>
                <div className="space-y-3">
                  {/* Skill gap card */}
                  <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/60 flex items-center justify-between gap-4">
                    <div className="space-y-1">
                      <span className="text-[10px] text-indigo-400 font-bold uppercase tracking-wider">Skill Gap Audit</span>
                      <h4 className="text-sm font-bold text-white">FastAPI & Docker Skills</h4>
                      <p className="text-xs text-slate-400">Bridge AWS & Docker to unlock 4 software engineering roles.</p>
                    </div>
                    <div className="flex flex-col items-center justify-center shrink-0 w-16 h-16 rounded-xl bg-slate-900 border border-slate-800">
                      <TrendingUp className="w-6 h-6 text-indigo-400" />
                      <span className="text-[9px] text-slate-500 font-bold uppercase mt-1">92% Match</span>
                    </div>
                  </div>
                  {/* ATS card */}
                  <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/60 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">ATS Resume Optimizer</span>
                      <span className="text-xs font-bold text-white">Score: 84/100</span>
                    </div>
                    <div className="h-2 bg-slate-900 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-emerald-500 to-indigo-500 rounded-full" style={{ width: "84%" }} />
                    </div>
                    <p className="text-[11px] text-slate-400 italic">"Add 'CI/CD Pipelines' to bullet 3 to increase score to 92%"</p>
                  </div>
                  {/* Course card */}
                  <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/60 flex items-center justify-between">
                    <div className="space-y-1">
                      <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider">Recommended Course</span>
                      <h5 className="text-xs font-bold text-white">Docker and Container Basics</h5>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/10 uppercase">Free</span>
                  </div>
                  {/* Career path card */}
                  <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/60 flex items-center justify-between gap-3">
                    <div className="space-y-1">
                      <span className="text-[10px] text-purple-400 font-bold uppercase tracking-wider">Career Path</span>
                      <h5 className="text-xs font-bold text-white">Junior → Senior Engineer in 3 yrs</h5>
                    </div>
                    <div className="flex gap-1">
                      {[40, 65, 85, 100].map((w, i) => (
                        <div key={i} className="w-1.5 rounded-full bg-gradient-to-t from-indigo-600 to-purple-400" style={{ height: `${w * 0.3}px` }} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            className="flex justify-center mt-16"
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <ChevronDown className="w-6 h-6 text-slate-600" />
          </motion.div>
        </div>
      </section>

      {/* ── Stats Bar ── */}
      <section className="border-y border-slate-800/60 bg-slate-900/20 py-10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div key={i} {...fadeUp(i * 0.1)} className="text-center">
                <p className="text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
                  {stat.value}
                </p>
                <p className="text-sm text-slate-400 font-medium mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features Grid ── */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeUp()} className="text-center mb-14">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-bold text-indigo-400 mb-4">
              <Sparkles className="w-3.5 h-3.5" /> Everything you need
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">
              Your complete career intelligence platform
            </h2>
            <p className="text-slate-400 mt-3 max-w-xl mx-auto text-base">
              Six powerful tools working together to accelerate your career trajectory.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((feat, i) => {
              const Icon = feat.icon;
              return (
                <motion.div key={i} {...fadeUp(i * 0.07)}>
                  <div className="h-full bg-slate-900/20 border border-slate-800/60 p-6 rounded-2xl hover:border-slate-700/60 hover:bg-slate-900/30 transition-all duration-300 space-y-4 group">
                    <div className={`w-10 h-10 rounded-xl border flex items-center justify-center ${feat.bg} shrink-0`}>
                      <Icon className={`w-5 h-5 ${feat.color}`} />
                    </div>
                    <h3 className="text-base font-bold text-white tracking-tight">{feat.title}</h3>
                    <p className="text-sm text-slate-400 leading-relaxed">{feat.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="py-24 px-6 bg-slate-900/20 border-y border-slate-800/40">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeUp()} className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">
              Up and running in 3 steps
            </h2>
            <p className="text-slate-400 mt-3 max-w-lg mx-auto">
              From zero to personalized career intelligence in under 5 minutes.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((s, i) => (
              <motion.div key={i} {...fadeUp(i * 0.12)} className="relative text-center space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-500/20 to-purple-500/20 border border-indigo-500/20 flex items-center justify-center mx-auto">
                  <span className="text-xl font-black text-indigo-400">{s.step}</span>
                </div>
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-7 left-[calc(50%+36px)] right-[-calc(50%-36px)] h-0.5 bg-gradient-to-r from-indigo-500/30 to-transparent" />
                )}
                <h3 className="text-base font-bold text-white">{s.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeUp()} className="text-center mb-14">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs font-bold text-amber-400 mb-4">
              <Users className="w-3.5 h-3.5" /> Real stories
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">
              Loved by professionals worldwide
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div key={i} {...fadeUp(i * 0.1)}>
                <div className="h-full bg-slate-900/20 border border-slate-800/60 p-6 rounded-2xl space-y-4 hover:border-slate-700/60 transition-all">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed italic">"{t.text}"</p>
                  <div className="flex items-center gap-3 pt-2 border-t border-slate-800/60">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-xs font-bold text-white shrink-0">
                      {t.avatar}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white">{t.name}</p>
                      <p className="text-xs text-slate-400">{t.role}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Trusted By logos strip ── */}
      <section className="py-14 px-6 border-y border-slate-800/40 bg-slate-900/10">
        <div className="max-w-5xl mx-auto">
          <p className="text-center text-xs text-slate-500 font-bold uppercase tracking-widest mb-8">
            Trusted by professionals from
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            {["Google", "Meta", "Amazon", "Microsoft", "Stripe", "Airbnb", "Netflix", "Spotify"].map((co, i) => (
              <motion.span
                key={i}
                {...fadeUp(i * 0.05)}
                className="text-slate-600 font-black text-sm md:text-base tracking-tight hover:text-slate-400 transition-colors cursor-default select-none"
              >
                {co}
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div
            {...fadeUp()}
            className="relative bg-gradient-to-br from-indigo-950/60 via-purple-950/40 to-slate-950/60 border border-indigo-500/20 rounded-3xl p-10 md:p-14 text-center overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/5 to-purple-500/5 pointer-events-none" />
            <div className="relative z-10 space-y-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-bold text-indigo-400">
                <Shield className="w-3.5 h-3.5" /> Free forever · No credit card
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">
                Ready to own your career?
              </h2>
              <p className="text-slate-400 text-base max-w-md mx-auto">
                Join thousands of professionals making smarter career decisions with AI-powered insights.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  variant="primary"
                  onClick={() => navigate("/register")}
                  className="text-sm font-bold px-10 py-3.5 shadow-lg shadow-indigo-600/25 flex items-center justify-center gap-2 group"
                >
                  Start for Free
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => navigate("/login")}
                  className="text-sm font-bold px-10 py-3.5 border-slate-700 text-slate-300 hover:text-white"
                >
                  Sign In
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
