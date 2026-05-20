import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Compass, 
  Target, 
  FileText, 
  TrendingUp, 
  Sparkles, 
  ArrowRight, 
  Map, 
  BookOpen 
} from "lucide-react";
import Button from "../components/ui/Button";

export default function Landing() {
  const navigate = useNavigate();

  const features = [
    {
      icon: Target,
      title: "Intelligent Job Matching",
      description: "Our proprietary alignment engine scores your skills against live profiles, highlighting exact gaps."
    },
    {
      icon: Map,
      title: "Dynamic Career Pathways",
      description: "Map your long-term professional milestones, timelines, and projected salaries in interactive timelines."
    },
    {
      icon: FileText,
      title: "AI Resume Analyzer",
      description: "Upload or paste your resume to receive an ATS compatibility grade, keyword enhancements, and bullet fixes."
    },
    {
      icon: BookOpen,
      title: "Targeted Course Guide",
      description: "Bridge your verified skill gaps instantly with curated online courses grouped by missing credentials."
    }
  ];

  return (
    <div className="min-h-screen bg-[#0F0E1A] text-white overflow-hidden relative flex flex-col justify-between">
      {/* Background Decorative Blob Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-[40%] left-[30%] w-[40%] h-[40%] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-6 pt-16 pb-20 relative z-10 flex-1 flex flex-col justify-center">
        {/* Header Branding */}
        <div className="flex items-center gap-2 mb-16 self-center md:self-start">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
            <Compass className="w-5 h-5 text-white animate-spin-slow" />
          </div>
          <span className="text-lg font-black tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
            CAREER COMPASS
          </span>
        </div>

        {/* Hero Grid Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Title & CTA */}
          <div className="lg:col-span-6 text-center lg:text-left space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-bold text-indigo-400">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
              Powered by Advanced AI Intelligence
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
              Chart Your Path.<br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-emerald-400">
                Own Your Career.
              </span>
            </h1>

            <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-xl mx-auto lg:mx-0">
              Stop guessing your next career move. Navigate your trajectory, identify and bridge technical skill gaps, optimize resumes for ATS, and unlock curated learning recommended specifically for you.
            </p>

            {/* Call to Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <Button
                variant="primary"
                onClick={() => navigate("/register")}
                className="w-full sm:w-auto text-sm font-bold px-8 py-3.5 shadow-lg shadow-indigo-600/25 flex items-center justify-center gap-2 group"
              >
                Get Started Free
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate("/login")}
                className="w-full sm:w-auto text-sm font-bold px-8 py-3.5 bg-slate-900/40 hover:bg-slate-900 border-slate-800 text-slate-200 hover:text-white flex items-center justify-center gap-2"
              >
                Sign In
              </Button>
            </div>
          </div>

          {/* Right Column: Visual Dashboard Mockup Card */}
          <div className="lg:col-span-6 relative mt-6 lg:mt-0">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="bg-slate-900/30 border border-slate-800/80 p-6 rounded-2xl shadow-2xl relative overflow-hidden backdrop-blur-md"
            >
              {/* Card header with fake mac dots */}
              <div className="flex items-center gap-1.5 mb-6">
                <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span className="text-[10px] text-slate-500 font-bold ml-2 tracking-widest uppercase">
                  COMPASS_COPILOT.CONFIG
                </span>
              </div>

              {/* Graphical Content Area */}
              <div className="space-y-4">
                {/* Simulated Radar Chart Area */}
                <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/60 flex items-center justify-between gap-4">
                  <div className="space-y-2">
                    <span className="text-[10px] text-indigo-400 font-bold uppercase tracking-wider">Skill Gap Audit</span>
                    <h4 className="text-sm font-bold text-white">FastAPI & Docker Skills</h4>
                    <p className="text-xs text-slate-400">Bridge AWS & Docker to unlock 4 software engineering roles.</p>
                  </div>
                  <div className="flex flex-col items-center justify-center shrink-0 w-16 h-16 rounded-xl bg-slate-900 border border-slate-800">
                    <TrendingUp className="w-6 h-6 text-indigo-400" />
                    <span className="text-[9px] text-slate-500 font-bold uppercase mt-1">92% Match</span>
                  </div>
                </div>

                {/* Simulated ATS Resume analysis */}
                <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/60 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">ATS Resume Optimizer</span>
                    <span className="text-xs font-bold text-white">Score: 84/100</span>
                  </div>
                  <div className="h-2 bg-slate-900 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-emerald-500 to-indigo-500 rounded-full" style={{ width: "84%" }} />
                  </div>
                  <p className="text-[11px] text-slate-400 italic">"Strong alignment. Add 'CI/CD Pipelines' to bullet 3 to increase to 92%"</p>
                </div>

                {/* Course Recommendation */}
                <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/60 flex items-center justify-between">
                  <div className="space-y-1">
                    <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider">Recommended Course</span>
                    <h5 className="text-xs font-bold text-white">Docker and Container Basics</h5>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/10 uppercase">
                    Free
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-28">
          {features.map((feat, idx) => {
            const IconComp = feat.icon;
            return (
              <div 
                key={idx} 
                className="bg-slate-900/10 border border-slate-800/60 p-5 rounded-2xl hover:border-slate-700/60 hover:bg-slate-900/20 transition-all duration-300 space-y-3"
              >
                <div className="w-9 h-9 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center text-indigo-400 shadow-sm shrink-0">
                  <IconComp className="w-4.5 h-4.5" />
                </div>
                <h3 className="text-sm font-bold text-white tracking-tight">{feat.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{feat.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer copyright */}
      <div className="w-full py-6 border-t border-slate-900 text-center relative z-10 text-xs text-slate-500 font-medium">
        © 2026 Career Compass. Architected with high fidelity and advanced AI.
      </div>
    </div>
  );
}
