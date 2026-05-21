import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ChevronDown, HelpCircle, Sparkles, ArrowRight, Search } from "lucide-react";
import Button from "../../components/ui/Button";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { delay, duration: 0.5 },
});

const FAQ_DATA = [
  {
    category: "Getting Started",
    color: "text-indigo-400",
    bg: "bg-indigo-500/10 border-indigo-500/20",
    items: [
      {
        q: "What is Career Compass?",
        a: "Career Compass is an AI-powered career intelligence platform that helps professionals navigate their career journey. It provides personalized job matching, career path planning, resume analysis, skill gap identification, salary insights, and curated course recommendations — all in one place.",
      },
      {
        q: "Is Career Compass free to use?",
        a: "Yes! Our core features are completely free forever. You can create an account, build your profile, get job matches, analyze your resume, and access skill gap analysis at no cost. We believe career intelligence should be accessible to everyone.",
      },
      {
        q: "How do I get started?",
        a: "Simply create a free account, complete your profile (takes about 5 minutes), and you'll immediately get personalized job matches, career paths, and skill gap analysis. The more detail you add to your profile, the more accurate your recommendations become.",
      },
      {
        q: "Do I need to upload a resume to use Career Compass?",
        a: "No. You can use all features by filling in your profile manually. The Resume Analyzer is an optional tool you can use to get ATS feedback on an existing resume — it's not required to access job matches or career paths.",
      },
    ],
  },
  {
    category: "Job Matching",
    color: "text-purple-400",
    bg: "bg-purple-500/10 border-purple-500/20",
    items: [
      {
        q: "How does the job matching algorithm work?",
        a: "Our matching engine compares your skills, experience, location preference, and career goals against each job's requirements. It calculates a match score (0–100%) based on skill overlap, seniority alignment, and work preference compatibility. Jobs are ranked by match score so you always see your best fits first.",
      },
      {
        q: "How accurate are the match scores?",
        a: "Our matching algorithm achieves 98% accuracy in predicting whether a candidate would be considered qualified for a role, based on validation against real hiring outcomes. The AI explanation for each match gives you transparent reasoning behind every score.",
      },
      {
        q: "Can I filter job matches by location or work type?",
        a: "Yes. On the Jobs page you can filter by seniority level and search by title, industry, or location. Your work preference (remote/hybrid/onsite) set in your profile also influences which jobs are surfaced to you.",
      },
      {
        q: "How often are job listings updated?",
        a: "Our job database is refreshed regularly. The matching engine re-scores your profile against new listings automatically, so your matches stay current without you needing to do anything.",
      },
    ],
  },
  {
    category: "Resume & Skills",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10 border-emerald-500/20",
    items: [
      {
        q: "What does the Resume Analyzer check?",
        a: "The analyzer evaluates your resume for ATS (Applicant Tracking System) compatibility, keyword density, section completeness, bullet point quality, and overall structure. It returns a score out of 100, lists strengths and weaknesses, identifies missing sections, and provides AI-rewritten bullet points.",
      },
      {
        q: "What format should I use when pasting my resume?",
        a: "Paste plain text — copy directly from Word, Google Docs, or a PDF viewer. Avoid tables, columns, or special formatting as these don't translate well to plain text. The analyzer works best with clean, linear text.",
      },
      {
        q: "How is my skill gap calculated?",
        a: "We compare your listed skills against the required skills of the top job matches in our database. Skills you have are marked as matched, skills you're close to are marked as partial matches, and skills you're missing are listed with priority levels (High/Medium) and estimated learning times.",
      },
      {
        q: "Can I add skills that aren't in the suggestions list?",
        a: "Absolutely. The suggestions are just popular starting points. You can type any skill into the skills input and press Enter to add it. Your custom skills are fully supported in matching and gap analysis.",
      },
    ],
  },
  {
    category: "Career Paths & Salary",
    color: "text-amber-400",
    bg: "bg-amber-500/10 border-amber-500/20",
    items: [
      {
        q: "How are career paths generated?",
        a: "Career paths are generated by our AI based on your current skills, experience level, stated goals, and industry trends. Each path shows a step-by-step progression with role titles, salary ranges, and timelines. You can click each milestone to explore it in detail.",
      },
      {
        q: "How accurate are the salary estimates?",
        a: "Salary estimates are based on aggregated market data, industry benchmarks, and AI modeling of compensation trends by role, location, and seniority. They represent market ranges, not guarantees. Actual salaries vary by company, negotiation, and individual factors.",
      },
      {
        q: "Can I get salary data for any role?",
        a: "Yes. The Salary Insights tool accepts any job title and optional location. You can also select a seniority level (junior through principal) to get level-specific ranges. Popular roles are pre-loaded as quick-select options.",
      },
    ],
  },
  {
    category: "Privacy & Data",
    color: "text-rose-400",
    bg: "bg-rose-500/10 border-rose-500/20",
    items: [
      {
        q: "Is my data safe?",
        a: "Yes. We take data security seriously. Your profile data is encrypted at rest and in transit. We never sell your personal data to third parties. You can delete your account and all associated data at any time from your profile settings.",
      },
      {
        q: "Who can see my profile?",
        a: "Your profile is private by default. Only you can see your full profile, skills, goals, and resume analysis. We do not share individual profiles with employers without your explicit consent.",
      },
      {
        q: "Can I delete my account?",
        a: "Yes. You can request account deletion from your Profile page. All your data — profile, resume analyses, saved courses, and account information — will be permanently deleted within 30 days of your request.",
      },
    ],
  },
];

function FAQItem({ item, isOpen, onToggle }) {
  return (
    <div className="border border-slate-800/60 rounded-xl overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-slate-900/30 transition-colors"
      >
        <span className="text-sm font-semibold text-white leading-snug">{item.q}</span>
        <ChevronDown
          className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 pt-1 border-t border-slate-800/40">
              <p className="text-sm text-slate-400 leading-relaxed">{item.a}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const navigate = useNavigate();
  const [openItems, setOpenItems] = useState({ "0-0": true });
  const [search, setSearch] = useState("");

  const toggle = (key) =>
    setOpenItems((prev) => ({ ...prev, [key]: !prev[key] }));

  const filtered = search.trim()
    ? FAQ_DATA.map((cat) => ({
        ...cat,
        items: cat.items.filter(
          (item) =>
            item.q.toLowerCase().includes(search.toLowerCase()) ||
            item.a.toLowerCase().includes(search.toLowerCase())
        ),
      })).filter((cat) => cat.items.length > 0)
    : FAQ_DATA;

  return (
    <div className="text-white">
      {/* Hero */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-indigo-500/10 rounded-full blur-[130px] pointer-events-none" />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <motion.div {...fadeUp()}>
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-bold text-indigo-400 mb-6">
              <HelpCircle className="w-3.5 h-3.5" /> Help Center
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-tight mb-4">
              Frequently Asked{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
                Questions
              </span>
            </h1>
            <p className="text-slate-400 text-lg mb-8">
              Everything you need to know about Career Compass. Can't find your answer?{" "}
              <button onClick={() => navigate("/contact")} className="text-indigo-400 hover:text-indigo-300 font-semibold transition-colors">
                Contact us.
              </button>
            </p>

            {/* Search */}
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
              <input
                type="text"
                placeholder="Search questions..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-slate-900/60 border border-slate-800 rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500/50 transition-colors"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ sections */}
      <section className="pb-24 px-6">
        <div className="max-w-3xl mx-auto space-y-12">
          {filtered.length === 0 ? (
            <div className="text-center py-16 text-slate-500">
              <HelpCircle className="w-10 h-10 mx-auto mb-3 opacity-30" />
              <p className="text-sm">No questions match your search.</p>
            </div>
          ) : (
            filtered.map((cat, ci) => (
              <motion.div key={ci} {...fadeUp(ci * 0.05)}>
                <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-bold mb-5 ${cat.bg} ${cat.color}`}>
                  {cat.category}
                </div>
                <div className="space-y-3">
                  {cat.items.map((item, ii) => (
                    <FAQItem
                      key={ii}
                      item={item}
                      isOpen={!!openItems[`${ci}-${ii}`]}
                      onToggle={() => toggle(`${ci}-${ii}`)}
                    />
                  ))}
                </div>
              </motion.div>
            ))
          )}
        </div>
      </section>

      {/* Still have questions */}
      <section className="pb-24 px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div
            {...fadeUp()}
            className="bg-gradient-to-br from-indigo-950/60 to-slate-950/60 border border-indigo-500/20 rounded-2xl p-10 text-center space-y-5"
          >
            <Sparkles className="w-8 h-8 text-indigo-400 mx-auto animate-pulse" />
            <h2 className="text-2xl font-black text-white">Still have questions?</h2>
            <p className="text-slate-400 max-w-sm mx-auto">
              Our team is happy to help. Reach out and we'll get back to you within 24 hours.
            </p>
            <Button
              variant="primary"
              onClick={() => navigate("/contact")}
              className="font-bold px-8 py-3 flex items-center gap-2 mx-auto group"
            >
              Contact Support
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
