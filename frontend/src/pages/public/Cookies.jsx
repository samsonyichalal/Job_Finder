import React from "react";
import { motion } from "framer-motion";
import { Cookie, CheckCircle2, XCircle, Info } from "lucide-react";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { delay, duration: 0.5 },
});

const COOKIE_TYPES = [
  {
    name: "Strictly Necessary",
    required: true,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10 border-emerald-500/20",
    description: "These cookies are essential for the website to function. They enable core features like authentication, security, and session management. They cannot be disabled.",
    examples: [
      { name: "cc_token", purpose: "Authentication token to keep you logged in", duration: "7 days" },
      { name: "cc_session", purpose: "Session identifier for security", duration: "Session" },
      { name: "cc_csrf", purpose: "Cross-site request forgery protection", duration: "Session" },
    ],
  },
  {
    name: "Functional",
    required: false,
    color: "text-indigo-400",
    bg: "bg-indigo-500/10 border-indigo-500/20",
    description: "These cookies enable enhanced functionality and personalization, such as remembering your preferences and settings. Disabling them may affect your experience.",
    examples: [
      { name: "cc_prefs", purpose: "Stores your UI preferences (theme, sidebar state)", duration: "1 year" },
      { name: "cc_lang", purpose: "Remembers your language preference", duration: "1 year" },
    ],
  },
  {
    name: "Analytics",
    required: false,
    color: "text-amber-400",
    bg: "bg-amber-500/10 border-amber-500/20",
    description: "These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. This helps us improve our service.",
    examples: [
      { name: "_ga", purpose: "Google Analytics — distinguishes users", duration: "2 years" },
      { name: "_gid", purpose: "Google Analytics — distinguishes users (short-term)", duration: "24 hours" },
      { name: "cc_analytics", purpose: "Internal analytics for feature usage", duration: "90 days" },
    ],
  },
  {
    name: "Marketing",
    required: false,
    color: "text-rose-400",
    bg: "bg-rose-500/10 border-rose-500/20",
    description: "These cookies track your browsing activity to deliver relevant advertisements. We currently use minimal marketing cookies and do not sell your data to advertisers.",
    examples: [
      { name: "cc_ref", purpose: "Tracks referral source for attribution", duration: "30 days" },
    ],
  },
];

export default function Cookies() {
  return (
    <div className="text-white">
      {/* Hero */}
      <section className="relative py-20 px-6 overflow-hidden border-b border-slate-800/40">
        <div className="absolute top-[-20%] left-[-10%] w-[40%] h-[40%] bg-amber-500/8 rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div {...fadeUp()}>
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs font-bold text-amber-400 mb-6">
              <Cookie className="w-3.5 h-3.5" /> Legal
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">Cookie Policy</h1>
            <p className="text-slate-400 text-base max-w-2xl">
              This policy explains what cookies are, how Career Compass uses them, and how you can control them.
            </p>
            <div className="flex flex-wrap gap-4 mt-6 text-xs text-slate-500">
              <span>Last updated: <span className="text-slate-300 font-semibold">May 21, 2026</span></span>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* What are cookies */}
          <motion.div {...fadeUp()}>
            <div className="flex items-start gap-4 bg-slate-900/40 border border-slate-800/60 rounded-2xl p-6">
              <Info className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
              <div>
                <h2 className="text-base font-bold text-white mb-2">What are cookies?</h2>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Cookies are small text files stored on your device when you visit a website. They help websites remember information about your visit, making your next visit easier and the site more useful to you. Cookies can be "session cookies" (deleted when you close your browser) or "persistent cookies" (remain until they expire or you delete them).
                </p>
              </div>
            </div>
          </motion.div>

          {/* Cookie types */}
          {COOKIE_TYPES.map((type, i) => (
            <motion.div key={i} {...fadeUp(i * 0.08)}>
              <div className={`border rounded-2xl overflow-hidden ${type.bg}`}>
                {/* Header */}
                <div className="px-6 py-5 flex items-center justify-between border-b border-slate-800/40">
                  <div className="flex items-center gap-3">
                    <Cookie className={`w-5 h-5 ${type.color}`} />
                    <h2 className={`text-base font-bold ${type.color}`}>{type.name} Cookies</h2>
                  </div>
                  <div className={`flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full ${
                    type.required
                      ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                      : "bg-slate-800/60 text-slate-400 border border-slate-700/60"
                  }`}>
                    {type.required ? (
                      <><CheckCircle2 className="w-3 h-3" /> Always Active</>
                    ) : (
                      <><XCircle className="w-3 h-3" /> Optional</>
                    )}
                  </div>
                </div>

                {/* Description */}
                <div className="px-6 py-4">
                  <p className="text-sm text-slate-400 leading-relaxed mb-5">{type.description}</p>

                  {/* Cookie table */}
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs">
                      <thead>
                        <tr className="border-b border-slate-800/60">
                          <th className="text-left py-2 pr-4 text-slate-500 font-bold uppercase tracking-wider">Cookie Name</th>
                          <th className="text-left py-2 pr-4 text-slate-500 font-bold uppercase tracking-wider">Purpose</th>
                          <th className="text-left py-2 text-slate-500 font-bold uppercase tracking-wider">Duration</th>
                        </tr>
                      </thead>
                      <tbody>
                        {type.examples.map((ex, j) => (
                          <tr key={j} className="border-b border-slate-800/30 last:border-0">
                            <td className="py-3 pr-4 font-mono text-indigo-300 font-semibold">{ex.name}</td>
                            <td className="py-3 pr-4 text-slate-400">{ex.purpose}</td>
                            <td className="py-3 text-slate-300 font-medium whitespace-nowrap">{ex.duration}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Managing cookies */}
          <motion.div {...fadeUp()}>
            <h2 className="text-xl font-black text-white mb-6 pb-3 border-b border-slate-800/60">Managing Your Cookie Preferences</h2>
            <div className="space-y-4 text-sm text-slate-400 leading-relaxed">
              <p>
                <span className="text-white font-semibold">Browser settings:</span> Most browsers allow you to control cookies through their settings. You can typically find these in the "Privacy" or "Security" section of your browser's settings menu. Note that blocking all cookies may affect the functionality of Career Compass.
              </p>
              <p>
                <span className="text-white font-semibold">Opt-out tools:</span> For analytics cookies, you can opt out of Google Analytics by installing the{" "}
                <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-300 transition-colors">
                  Google Analytics Opt-out Browser Add-on
                </a>.
              </p>
              <p>
                <span className="text-white font-semibold">Do Not Track:</span> Some browsers have a "Do Not Track" feature. We honor Do Not Track signals and will not track users who have this enabled.
              </p>
              <p>
                <span className="text-white font-semibold">Questions:</span> If you have questions about our use of cookies, contact us at privacy@careercompass.ai.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
