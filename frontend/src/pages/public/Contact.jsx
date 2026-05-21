import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail, MessageSquare, MapPin, Clock, Send,
  CheckCircle2, AlertCircle, Phone, Sparkles
} from "lucide-react";
import Button from "../../components/ui/Button";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { delay, duration: 0.5 },
});

const CONTACT_INFO = [
  {
    icon: Mail,
    label: "Email Us",
    value: "hello@careercompass.ai",
    sub: "We reply within 24 hours",
    color: "text-indigo-400",
    bg: "bg-indigo-500/10 border-indigo-500/20",
  },
  {
    icon: MessageSquare,
    label: "Live Chat",
    value: "Available in-app",
    sub: "Mon–Fri, 9am–6pm PST",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10 border-emerald-500/20",
  },
  {
    icon: MapPin,
    label: "Headquarters",
    value: "San Francisco, CA",
    sub: "United States",
    color: "text-purple-400",
    bg: "bg-purple-500/10 border-purple-500/20",
  },
  {
    icon: Clock,
    label: "Support Hours",
    value: "Mon–Fri",
    sub: "9:00 AM – 6:00 PM PST",
    color: "text-amber-400",
    bg: "bg-amber-500/10 border-amber-500/20",
  },
];

const TOPICS = [
  "General Inquiry",
  "Technical Support",
  "Account & Billing",
  "Feature Request",
  "Partnership",
  "Press & Media",
  "Other",
];

export default function Contact() {
  const [form, setForm] = useState({
    name: "", email: "", topic: "General Inquiry", message: "",
  });
  const [status, setStatus] = useState(null); // null | "success" | "error"
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setStatus("error");
      return;
    }
    setLoading(true);
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setStatus("success");
    setForm({ name: "", email: "", topic: "General Inquiry", message: "" });
  };

  return (
    <div className="text-white">
      {/* Hero */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-purple-500/10 rounded-full blur-[130px] pointer-events-none" />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <motion.div {...fadeUp()}>
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-xs font-bold text-purple-400 mb-6">
              <MessageSquare className="w-3.5 h-3.5" /> Get in Touch
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-tight mb-4">
              We'd love to{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-400">
                hear from you.
              </span>
            </h1>
            <p className="text-slate-400 text-lg">
              Whether you have a question, feedback, or just want to say hello — our team is here for you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact info cards */}
      <section className="pb-16 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {CONTACT_INFO.map((info, i) => {
            const Icon = info.icon;
            return (
              <motion.div key={i} {...fadeUp(i * 0.08)}>
                <div className={`h-full border rounded-2xl p-5 space-y-3 ${info.bg}`}>
                  <div className={`w-9 h-9 rounded-xl border flex items-center justify-center ${info.bg}`}>
                    <Icon className={`w-4.5 h-4.5 ${info.color}`} />
                  </div>
                  <div>
                    <p className={`text-[10px] font-bold uppercase tracking-widest ${info.color}`}>{info.label}</p>
                    <p className="text-sm font-bold text-white mt-0.5">{info.value}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{info.sub}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Form + Map */}
      <section className="pb-24 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Form */}
          <motion.div {...fadeUp(0.1)} className="lg:col-span-3">
            <div className="bg-slate-900/40 border border-slate-800/60 rounded-2xl p-8">
              <h2 className="text-xl font-black text-white mb-6">Send us a message</h2>

              <AnimatePresence>
                {status === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm px-4 py-3 rounded-xl mb-6"
                  >
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    Message sent! We'll get back to you within 24 hours.
                  </motion.div>
                )}
                {status === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-3 bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm px-4 py-3 rounded-xl mb-6"
                  >
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    Please fill in all required fields.
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">Full Name *</label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Jane Smith"
                      className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500/50 transition-colors"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">Email Address *</label>
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500/50 transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">Topic</label>
                  <select
                    name="topic"
                    value={form.topic}
                    onChange={handleChange}
                    className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500/50 transition-colors appearance-none"
                  >
                    {TOPICS.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">Message *</label>
                  <textarea
                    name="message"
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell us how we can help..."
                    className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500/50 transition-colors resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  disabled={loading}
                  className="w-full py-3.5 font-bold flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </div>
          </motion.div>

          {/* Sidebar info */}
          <motion.div {...fadeUp(0.2)} className="lg:col-span-2 space-y-6">
            {/* Office visual */}
            <div className="bg-gradient-to-br from-indigo-950/60 to-slate-950/60 border border-indigo-500/20 rounded-2xl p-6 space-y-4">
              <div className="w-full h-36 bg-slate-900/60 rounded-xl border border-slate-800/60 flex items-center justify-center overflow-hidden relative">
                {/* Stylized map placeholder */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/30 to-purple-900/20" />
                <div className="relative z-10 text-center">
                  <MapPin className="w-8 h-8 text-indigo-400 mx-auto mb-2" />
                  <p className="text-xs font-bold text-white">San Francisco, CA</p>
                  <p className="text-[10px] text-slate-400">United States</p>
                </div>
                {/* Grid lines */}
                <div className="absolute inset-0 opacity-10" style={{
                  backgroundImage: "linear-gradient(rgba(99,102,241,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.5) 1px, transparent 1px)",
                  backgroundSize: "20px 20px"
                }} />
              </div>
              <div>
                <p className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Our Office</p>
                <p className="text-sm text-white font-semibold mt-1">Career Compass HQ</p>
                <p className="text-xs text-slate-400 mt-0.5">548 Market St, San Francisco, CA 94104</p>
              </div>
            </div>

            {/* Response time */}
            <div className="bg-slate-900/40 border border-slate-800/60 rounded-2xl p-6 space-y-4">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <h3 className="text-base font-bold text-white">What to expect</h3>
              <div className="space-y-3">
                {[
                  { label: "Email response", time: "Within 24 hours" },
                  { label: "Technical issues", time: "Within 4 hours" },
                  { label: "Partnership inquiries", time: "Within 48 hours" },
                  { label: "Press & media", time: "Within 24 hours" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between text-sm">
                    <span className="text-slate-400">{item.label}</span>
                    <span className="text-white font-semibold text-xs">{item.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
