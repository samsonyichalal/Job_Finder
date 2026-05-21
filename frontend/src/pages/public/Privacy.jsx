import React, { useState } from "react";
import { motion } from "framer-motion";
import { Shield, ChevronRight } from "lucide-react";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { delay, duration: 0.5 },
});

const SECTIONS = [
  {
    id: "collection",
    title: "1. Information We Collect",
    content: [
      {
        subtitle: "Information you provide directly",
        text: "When you create an account, we collect your name, email address, and password. When you build your profile, we collect your skills, work experience, education history, career goals, salary expectations, and location preferences. When you use the Resume Analyzer, we process the resume text you submit.",
      },
      {
        subtitle: "Information collected automatically",
        text: "We automatically collect certain technical information when you use our service, including your IP address, browser type, operating system, referring URLs, pages visited, and time spent on pages. This information is used to improve our service and ensure security.",
      },
      {
        subtitle: "Information from third parties",
        text: "We do not currently collect information from third-party sources. If this changes, we will update this policy and notify you.",
      },
    ],
  },
  {
    id: "use",
    title: "2. How We Use Your Information",
    content: [
      {
        subtitle: "To provide and improve our service",
        text: "We use your profile information to generate personalized job matches, career path recommendations, skill gap analyses, and course suggestions. The more complete your profile, the more accurate these recommendations become.",
      },
      {
        subtitle: "To communicate with you",
        text: "We may send you service-related emails such as account confirmations, security alerts, and product updates. You can opt out of marketing communications at any time, but we may still send you transactional messages necessary for the service.",
      },
      {
        subtitle: "To ensure security",
        text: "We use your information to detect and prevent fraud, abuse, and other harmful activities. We may analyze usage patterns to identify and address security vulnerabilities.",
      },
      {
        subtitle: "For analytics and research",
        text: "We use aggregated, anonymized data to understand how our service is used, identify trends, and improve our AI models. This data cannot be used to identify individual users.",
      },
    ],
  },
  {
    id: "sharing",
    title: "3. Information Sharing",
    content: [
      {
        subtitle: "We do not sell your data",
        text: "Career Compass does not sell, rent, or trade your personal information to third parties for their marketing purposes. Your career data is yours.",
      },
      {
        subtitle: "Service providers",
        text: "We may share your information with trusted third-party service providers who assist us in operating our platform (e.g., cloud hosting, email delivery). These providers are contractually obligated to protect your data and may only use it to provide services to us.",
      },
      {
        subtitle: "Legal requirements",
        text: "We may disclose your information if required by law, court order, or governmental authority, or if we believe disclosure is necessary to protect our rights, your safety, or the safety of others.",
      },
      {
        subtitle: "Business transfers",
        text: "In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction. We will notify you via email and/or prominent notice on our website before your information is transferred.",
      },
    ],
  },
  {
    id: "security",
    title: "4. Data Security",
    content: [
      {
        subtitle: "Encryption",
        text: "All data transmitted between your browser and our servers is encrypted using TLS (Transport Layer Security). Data stored in our databases is encrypted at rest using AES-256 encryption.",
      },
      {
        subtitle: "Access controls",
        text: "Access to user data is strictly limited to employees who need it to perform their job functions. All access is logged and audited. We use multi-factor authentication for all internal systems.",
      },
      {
        subtitle: "Incident response",
        text: "In the event of a data breach, we will notify affected users within 72 hours of becoming aware of the breach, in accordance with applicable data protection laws.",
      },
    ],
  },
  {
    id: "rights",
    title: "5. Your Rights",
    content: [
      {
        subtitle: "Access and portability",
        text: "You have the right to access all personal information we hold about you and to receive a copy in a portable format. You can request this from your Profile settings or by contacting us.",
      },
      {
        subtitle: "Correction",
        text: "You can update or correct your personal information at any time through your Profile page. If you need assistance correcting information, contact our support team.",
      },
      {
        subtitle: "Deletion",
        text: "You have the right to request deletion of your account and all associated personal data. We will process deletion requests within 30 days. Note that some information may be retained for legal compliance purposes.",
      },
      {
        subtitle: "Opt-out",
        text: "You can opt out of marketing communications at any time by clicking 'Unsubscribe' in any email or by contacting us. You can also disable certain data collection through your browser settings.",
      },
    ],
  },
  {
    id: "cookies",
    title: "6. Cookies",
    content: [
      {
        subtitle: "What we use cookies for",
        text: "We use cookies and similar tracking technologies to maintain your session, remember your preferences, and analyze how our service is used. We use both session cookies (which expire when you close your browser) and persistent cookies.",
      },
      {
        subtitle: "Managing cookies",
        text: "You can control cookies through your browser settings. Note that disabling certain cookies may affect the functionality of our service. See our Cookie Policy for detailed information.",
      },
    ],
  },
  {
    id: "children",
    title: "7. Children's Privacy",
    content: [
      {
        subtitle: "Age requirement",
        text: "Career Compass is not intended for users under the age of 16. We do not knowingly collect personal information from children under 16. If we become aware that we have collected information from a child under 16, we will delete it immediately.",
      },
    ],
  },
  {
    id: "changes",
    title: "8. Changes to This Policy",
    content: [
      {
        subtitle: "Notification of changes",
        text: "We may update this Privacy Policy from time to time. We will notify you of significant changes by email and by posting a prominent notice on our website at least 30 days before the changes take effect. Your continued use of the service after the effective date constitutes acceptance of the updated policy.",
      },
    ],
  },
  {
    id: "contact",
    title: "9. Contact Us",
    content: [
      {
        subtitle: "Privacy questions",
        text: "If you have questions about this Privacy Policy or our data practices, please contact our Privacy Team at privacy@careercompass.ai or write to us at: Career Compass Privacy Team, 548 Market St, San Francisco, CA 94104, United States.",
      },
    ],
  },
];

export default function Privacy() {
  const [activeSection, setActiveSection] = useState("collection");

  return (
    <div className="text-white">
      {/* Hero */}
      <section className="relative py-20 px-6 overflow-hidden border-b border-slate-800/40">
        <div className="absolute top-[-20%] left-[-10%] w-[40%] h-[40%] bg-indigo-500/8 rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div {...fadeUp()}>
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-bold text-indigo-400 mb-6">
              <Shield className="w-3.5 h-3.5" /> Legal
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">Privacy Policy</h1>
            <p className="text-slate-400 text-base max-w-2xl">
              We take your privacy seriously. This policy explains what data we collect, how we use it, and the rights you have over your information.
            </p>
            <div className="flex flex-wrap gap-4 mt-6 text-xs text-slate-500">
              <span>Last updated: <span className="text-slate-300 font-semibold">May 21, 2026</span></span>
              <span>Effective date: <span className="text-slate-300 font-semibold">January 1, 2026</span></span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-10">
          {/* Sticky TOC */}
          <aside className="lg:w-56 shrink-0">
            <div className="lg:sticky lg:top-24 space-y-1">
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">Contents</p>
              {SECTIONS.map((s) => (
                <button
                  key={s.id}
                  onClick={() => {
                    setActiveSection(s.id);
                    document.getElementById(s.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
                  }}
                  className={`w-full text-left flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                    activeSection === s.id
                      ? "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20"
                      : "text-slate-400 hover:text-white hover:bg-slate-900/40"
                  }`}
                >
                  <ChevronRight className="w-3 h-3 shrink-0" />
                  <span className="truncate">{s.title.replace(/^\d+\.\s/, "")}</span>
                </button>
              ))}
            </div>
          </aside>

          {/* Main content */}
          <div className="flex-1 space-y-12">
            {SECTIONS.map((section, si) => (
              <motion.div key={section.id} id={section.id} {...fadeUp(si * 0.03)}>
                <h2 className="text-xl font-black text-white mb-6 pb-3 border-b border-slate-800/60">
                  {section.title}
                </h2>
                <div className="space-y-6">
                  {section.content.map((block, bi) => (
                    <div key={bi}>
                      <h3 className="text-sm font-bold text-indigo-300 mb-2">{block.subtitle}</h3>
                      <p className="text-sm text-slate-400 leading-relaxed">{block.text}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
