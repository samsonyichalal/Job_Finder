import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Compass, Target, Eye, Heart, Users, Zap, Shield,
  ArrowRight, Sparkles, Globe, Award, TrendingUp
} from "lucide-react";
import Button from "../../components/ui/Button";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { delay, duration: 0.55, ease: "easeOut" },
});

const TEAM = [
  {
    name: "Alex Rivera",
    role: "CEO & Co-Founder",
    bio: "Former Google engineer with 12 years in AI/ML. Passionate about democratizing career intelligence.",
    avatar: "AR",
    gradient: "from-indigo-500 to-purple-600",
  },
  {
    name: "Priya Nair",
    role: "CTO & Co-Founder",
    bio: "Ex-Meta infrastructure lead. Built systems serving 500M+ users. Obsessed with scalable AI.",
    avatar: "PN",
    gradient: "from-purple-500 to-pink-600",
  },
  {
    name: "Jordan Kim",
    role: "Head of Product",
    bio: "Previously at LinkedIn and Indeed. 8 years designing career tools used by millions.",
    avatar: "JK",
    gradient: "from-emerald-500 to-teal-600",
  },
  {
    name: "Samira Hassan",
    role: "Head of AI Research",
    bio: "PhD in NLP from Stanford. Published researcher in career trajectory modeling and skill graphs.",
    avatar: "SH",
    gradient: "from-amber-500 to-orange-600",
  },
  {
    name: "Marcus Webb",
    role: "Lead Designer",
    bio: "Award-winning UX designer. Believes great design should make complex things feel effortless.",
    avatar: "MW",
    gradient: "from-rose-500 to-red-600",
  },
  {
    name: "Chen Liu",
    role: "Head of Engineering",
    bio: "Full-stack architect with deep expertise in real-time data pipelines and recommendation systems.",
    avatar: "CL",
    gradient: "from-cyan-500 to-blue-600",
  },
];

const VALUES = [
  {
    icon: Heart,
    title: "People First",
    desc: "Every feature we build starts with a real career challenge faced by real professionals. We listen before we build.",
    color: "text-rose-400",
    bg: "bg-rose-500/10 border-rose-500/20",
  },
  {
    icon: Shield,
    title: "Radical Transparency",
    desc: "We show you exactly how your match scores are calculated. No black boxes, no hidden algorithms.",
    color: "text-indigo-400",
    bg: "bg-indigo-500/10 border-indigo-500/20",
  },
  {
    icon: Zap,
    title: "Relentless Innovation",
    desc: "The job market evolves daily. Our AI models are retrained continuously to stay ahead of industry shifts.",
    color: "text-amber-400",
    bg: "bg-amber-500/10 border-amber-500/20",
  },
  {
    icon: Globe,
    title: "Inclusive Access",
    desc: "Career intelligence shouldn't be a luxury. Our core tools are free forever, for everyone, everywhere.",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10 border-emerald-500/20",
  },
];

const MILESTONES = [
  { year: "2022", event: "Founded in San Francisco with a mission to democratize career intelligence." },
  { year: "2023", event: "Launched beta with 500 early users. Raised $2.4M seed round." },
  { year: "2024", event: "Reached 10,000 active users. Launched AI resume analyzer and salary insights." },
  { year: "2025", event: "Expanded to 40+ countries. Partnered with 200+ companies for direct job placements." },
  { year: "2026", event: "10M+ career decisions powered. Series A funding. Global expansion continues." },
];

export default function About() {
  const navigate = useNavigate();

  return (
    <div className="text-white">
      {/* ── Hero ── */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-indigo-500/10 rounded-full blur-[130px] pointer-events-none" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-purple-500/10 rounded-full blur-[130px] pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div {...fadeUp()}>
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-bold text-indigo-400 mb-6">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" /> Our Story
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight mb-6">
              We believe everyone deserves a{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-emerald-400">
                brilliant career.
              </span>
            </h1>
            <p className="text-lg text-slate-400 leading-relaxed max-w-2xl mx-auto">
              Career Compass was born from a simple frustration: the job market is full of data, but professionals have no intelligent way to navigate it. We built the platform we wished existed.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="py-12 px-6 border-y border-slate-800/40 bg-slate-900/20">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: "10M+", label: "Career decisions powered" },
            { value: "10K+", label: "Active professionals" },
            { value: "40+", label: "Countries served" },
            { value: "98%", label: "Match accuracy" },
          ].map((s, i) => (
            <motion.div key={i} {...fadeUp(i * 0.1)} className="text-center">
              <p className="text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">{s.value}</p>
              <p className="text-sm text-slate-400 mt-1">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Mission & Vision ── */}
      <section id="mission" className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div {...fadeUp()} className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">Mission & Vision</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Mission */}
            <motion.div {...fadeUp(0.1)}>
              <div className="h-full bg-gradient-to-br from-indigo-950/60 to-slate-950/60 border border-indigo-500/20 rounded-2xl p-8 space-y-5">
                <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                  <Target className="w-6 h-6 text-indigo-400" />
                </div>
                <div>
                  <span className="text-[10px] text-indigo-400 font-bold uppercase tracking-widest">Our Mission</span>
                  <h3 className="text-xl font-black text-white mt-1 mb-3">Democratize career intelligence</h3>
                  <p className="text-slate-400 leading-relaxed">
                    To give every professional — regardless of background, location, or resources — access to the same quality of career intelligence that was previously only available to those with expensive coaches or elite networks.
                  </p>
                </div>
                <div className="bg-indigo-950/40 border border-indigo-500/10 rounded-xl p-4">
                  <p className="text-sm text-indigo-200 italic leading-relaxed">
                    "We measure success not by revenue, but by the number of people who found a better career path because of us."
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Vision */}
            <motion.div {...fadeUp(0.2)}>
              <div className="h-full bg-gradient-to-br from-purple-950/60 to-slate-950/60 border border-purple-500/20 rounded-2xl p-8 space-y-5">
                <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                  <Eye className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <span className="text-[10px] text-purple-400 font-bold uppercase tracking-widest">Our Vision</span>
                  <h3 className="text-xl font-black text-white mt-1 mb-3">A world where no talent goes to waste</h3>
                  <p className="text-slate-400 leading-relaxed">
                    We envision a future where every person's skills are perfectly matched to opportunities that fulfill them — where AI bridges the gap between human potential and economic opportunity at a global scale.
                  </p>
                </div>
                <div className="bg-purple-950/40 border border-purple-500/10 rounded-xl p-4">
                  <p className="text-sm text-purple-200 italic leading-relaxed">
                    "By 2030, we aim to power 100 million career decisions across every continent."
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="py-24 px-6 bg-slate-900/20 border-y border-slate-800/40">
        <div className="max-w-5xl mx-auto">
          <motion.div {...fadeUp()} className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">What we stand for</h2>
            <p className="text-slate-400 mt-3 max-w-lg mx-auto">Our values aren't wall decorations — they're the principles behind every product decision we make.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {VALUES.map((v, i) => {
              const Icon = v.icon;
              return (
                <motion.div key={i} {...fadeUp(i * 0.1)}>
                  <div className={`h-full border rounded-2xl p-6 space-y-4 ${v.bg}`}>
                    <div className={`w-10 h-10 rounded-xl border flex items-center justify-center ${v.bg}`}>
                      <Icon className={`w-5 h-5 ${v.color}`} />
                    </div>
                    <h3 className="text-base font-bold text-white">{v.title}</h3>
                    <p className="text-sm text-slate-400 leading-relaxed">{v.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Timeline ── */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div {...fadeUp()} className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">Our journey</h2>
          </motion.div>
          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-indigo-500/50 via-purple-500/30 to-transparent" />
            <div className="space-y-8">
              {MILESTONES.map((m, i) => (
                <motion.div key={i} {...fadeUp(i * 0.1)} className="flex gap-6 pl-2">
                  <div className="relative shrink-0">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-xs font-black text-white shadow-lg shadow-indigo-500/20 z-10 relative">
                      {m.year.slice(2)}
                    </div>
                  </div>
                  <div className="flex-1 pb-2">
                    <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">{m.year}</span>
                    <p className="text-sm text-slate-300 mt-1 leading-relaxed">{m.event}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Team ── */}
      <section className="py-24 px-6 bg-slate-900/20 border-y border-slate-800/40">
        <div className="max-w-5xl mx-auto">
          <motion.div {...fadeUp()} className="text-center mb-14">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-bold text-emerald-400 mb-4">
              <Users className="w-3.5 h-3.5" /> The Team
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">Built by people who care</h2>
            <p className="text-slate-400 mt-3 max-w-lg mx-auto">
              Our team brings together expertise from Google, Meta, LinkedIn, Stanford, and beyond — united by a shared mission.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {TEAM.map((member, i) => (
              <motion.div key={i} {...fadeUp(i * 0.08)}>
                <div className="bg-slate-900/30 border border-slate-800/60 rounded-2xl p-6 space-y-4 hover:border-slate-700/60 transition-all group">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${member.gradient} flex items-center justify-center text-lg font-black text-white shadow-lg`}>
                    {member.avatar}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors">{member.name}</h3>
                    <p className="text-xs text-indigo-400 font-semibold mt-0.5">{member.role}</p>
                  </div>
                  <p className="text-sm text-slate-400 leading-relaxed">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div {...fadeUp()} className="bg-gradient-to-br from-indigo-950/60 via-purple-950/40 to-slate-950/60 border border-indigo-500/20 rounded-3xl p-12 space-y-6">
            <Award className="w-10 h-10 text-indigo-400 mx-auto" />
            <h2 className="text-3xl font-black text-white tracking-tight">Join our mission</h2>
            <p className="text-slate-400 max-w-md mx-auto">
              Be part of the movement to make career intelligence accessible to everyone.
            </p>
            <Button
              variant="primary"
              onClick={() => navigate("/register")}
              className="text-sm font-bold px-10 py-3.5 flex items-center gap-2 mx-auto group"
            >
              Get Started Free
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
