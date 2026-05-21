import React, { useState } from "react";
import { motion } from "framer-motion";
import { FileText, ChevronRight } from "lucide-react";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { delay, duration: 0.5 },
});

const SECTIONS = [
  {
    id: "acceptance",
    title: "1. Acceptance of Terms",
    content: [
      {
        subtitle: "Agreement to terms",
        text: "By accessing or using Career Compass ('the Service'), you agree to be bound by these Terms of Service ('Terms'). If you do not agree to these Terms, you may not access or use the Service. These Terms constitute a legally binding agreement between you and Career Compass, Inc.",
      },
      {
        subtitle: "Changes to terms",
        text: "We reserve the right to modify these Terms at any time. We will provide notice of significant changes by email or through the Service. Your continued use of the Service after changes become effective constitutes your acceptance of the revised Terms.",
      },
    ],
  },
  {
    id: "account",
    title: "2. Account Registration",
    content: [
      {
        subtitle: "Eligibility",
        text: "You must be at least 16 years old to use Career Compass. By creating an account, you represent that you meet this age requirement and that all information you provide is accurate and complete.",
      },
      {
        subtitle: "Account security",
        text: "You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You must notify us immediately of any unauthorized use of your account. We are not liable for any loss resulting from unauthorized use of your account.",
      },
      {
        subtitle: "One account per person",
        text: "Each person may maintain only one Career Compass account. Creating multiple accounts to circumvent restrictions or abuse our service is prohibited.",
      },
    ],
  },
  {
    id: "service",
    title: "3. Use of the Service",
    content: [
      {
        subtitle: "Permitted use",
        text: "Career Compass grants you a limited, non-exclusive, non-transferable license to access and use the Service for your personal, non-commercial career development purposes. You may not use the Service for any other purpose without our prior written consent.",
      },
      {
        subtitle: "Prohibited conduct",
        text: "You agree not to: (a) use the Service for any unlawful purpose; (b) attempt to gain unauthorized access to any part of the Service; (c) scrape, crawl, or extract data from the Service without permission; (d) upload malicious code or interfere with the Service's operation; (e) impersonate any person or entity; (f) use the Service to harass, abuse, or harm others; (g) violate any applicable laws or regulations.",
      },
      {
        subtitle: "AI-generated content",
        text: "The Service uses artificial intelligence to generate career recommendations, job matches, resume feedback, and other content. This content is provided for informational purposes only and does not constitute professional career, legal, or financial advice. You should exercise your own judgment when making career decisions.",
      },
    ],
  },
  {
    id: "content",
    title: "4. User Content",
    content: [
      {
        subtitle: "Your content",
        text: "You retain ownership of all content you submit to Career Compass, including your profile information, resume text, and any other materials ('User Content'). By submitting User Content, you grant us a limited license to use, process, and display it solely for the purpose of providing the Service to you.",
      },
      {
        subtitle: "Content standards",
        text: "You are solely responsible for your User Content. You represent that you have all necessary rights to submit the content and that it does not violate any third-party rights or applicable laws. You must not submit content that is false, misleading, defamatory, or infringes on intellectual property rights.",
      },
    ],
  },
  {
    id: "ip",
    title: "5. Intellectual Property",
    content: [
      {
        subtitle: "Our intellectual property",
        text: "The Service, including its design, features, algorithms, and content (excluding User Content), is owned by Career Compass, Inc. and is protected by copyright, trademark, and other intellectual property laws. You may not copy, modify, distribute, or create derivative works without our express written permission.",
      },
      {
        subtitle: "Feedback",
        text: "If you provide feedback, suggestions, or ideas about the Service, you grant us an irrevocable, royalty-free license to use that feedback for any purpose without compensation to you.",
      },
    ],
  },
  {
    id: "disclaimer",
    title: "6. Disclaimers",
    content: [
      {
        subtitle: "No employment guarantee",
        text: "Career Compass does not guarantee employment, job placement, or any specific career outcome. Job matches, career paths, and recommendations are provided as informational tools to assist your career development, not as guarantees of success.",
      },
      {
        subtitle: "Service availability",
        text: "We strive to maintain high availability but do not guarantee uninterrupted access to the Service. We may suspend or discontinue the Service at any time for maintenance, updates, or other reasons.",
      },
      {
        subtitle: "Accuracy of information",
        text: "While we work to ensure the accuracy of job listings, salary data, and other information, we cannot guarantee that all information is current, complete, or accurate. You should independently verify important information before making career decisions.",
      },
    ],
  },
  {
    id: "liability",
    title: "7. Limitation of Liability",
    content: [
      {
        subtitle: "Limitation",
        text: "To the maximum extent permitted by law, Career Compass shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the Service, including but not limited to loss of profits, data, or career opportunities.",
      },
      {
        subtitle: "Maximum liability",
        text: "Our total liability to you for any claims arising from these Terms or your use of the Service shall not exceed the amount you paid us in the 12 months preceding the claim, or $100, whichever is greater.",
      },
    ],
  },
  {
    id: "termination",
    title: "8. Termination",
    content: [
      {
        subtitle: "Termination by you",
        text: "You may terminate your account at any time by deleting it through your Profile settings. Upon termination, your right to use the Service ceases immediately.",
      },
      {
        subtitle: "Termination by us",
        text: "We may suspend or terminate your account at any time if we believe you have violated these Terms, engaged in fraudulent activity, or for any other reason at our discretion. We will provide notice where reasonably practicable.",
      },
    ],
  },
  {
    id: "governing",
    title: "9. Governing Law",
    content: [
      {
        subtitle: "Jurisdiction",
        text: "These Terms are governed by the laws of the State of California, United States, without regard to conflict of law principles. Any disputes arising from these Terms shall be resolved in the courts of San Francisco County, California.",
      },
    ],
  },
  {
    id: "contact",
    title: "10. Contact",
    content: [
      {
        subtitle: "Questions about these Terms",
        text: "If you have questions about these Terms of Service, please contact us at legal@careercompass.ai or write to: Career Compass Legal Team, 548 Market St, San Francisco, CA 94104, United States.",
      },
    ],
  },
];

export default function Terms() {
  const [activeSection, setActiveSection] = useState("acceptance");

  return (
    <div className="text-white">
      {/* Hero */}
      <section className="relative py-20 px-6 overflow-hidden border-b border-slate-800/40">
        <div className="absolute top-[-20%] right-[-10%] w-[40%] h-[40%] bg-purple-500/8 rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div {...fadeUp()}>
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-xs font-bold text-purple-400 mb-6">
              <FileText className="w-3.5 h-3.5" /> Legal
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">Terms of Service</h1>
            <p className="text-slate-400 text-base max-w-2xl">
              Please read these terms carefully before using Career Compass. By using our service, you agree to be bound by these terms.
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
          {/* TOC */}
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
                      ? "bg-purple-500/10 text-purple-400 border border-purple-500/20"
                      : "text-slate-400 hover:text-white hover:bg-slate-900/40"
                  }`}
                >
                  <ChevronRight className="w-3 h-3 shrink-0" />
                  <span className="truncate">{s.title.replace(/^\d+\.\s/, "")}</span>
                </button>
              ))}
            </div>
          </aside>

          {/* Content */}
          <div className="flex-1 space-y-12">
            {SECTIONS.map((section, si) => (
              <motion.div key={section.id} id={section.id} {...fadeUp(si * 0.03)}>
                <h2 className="text-xl font-black text-white mb-6 pb-3 border-b border-slate-800/60">
                  {section.title}
                </h2>
                <div className="space-y-6">
                  {section.content.map((block, bi) => (
                    <div key={bi}>
                      <h3 className="text-sm font-bold text-purple-300 mb-2">{block.subtitle}</h3>
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
