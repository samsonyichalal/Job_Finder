import React, { useState } from "react";
import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { Compass, Menu, X, ArrowRight } from "lucide-react";
import Button from "../ui/Button";

const NAV_LINKS = [
  { label: "Features", href: "/#features" },
  { label: "About", href: "/about" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

export default function PublicLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isLanding = location.pathname === "/";

  return (
    <div className="min-h-screen bg-[#0F0E1A] text-white flex flex-col">
      {/* ── Sticky Navbar ── */}
      <header className="sticky top-0 z-50 bg-[#0F0E1A]/85 backdrop-blur-md border-b border-slate-800/60">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 select-none">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <Compass className="w-4 h-4 text-white animate-spin-slow" />
            </div>
            <span className="text-base font-black tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
              CAREER COMPASS
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                to={l.href}
                className="text-sm font-medium text-slate-400 hover:text-white transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link to="/login" className="text-sm font-semibold text-slate-300 hover:text-white transition-colors">
              Sign In
            </Link>
            <Button variant="primary" size="sm" onClick={() => navigate("/register")} className="font-bold">
              Get Started Free
            </Button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800/60 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-slate-800/60 bg-[#0F0E1A]/95 px-6 py-4 space-y-3">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                to={l.href}
                onClick={() => setMobileOpen(false)}
                className="block text-sm font-medium text-slate-300 hover:text-white py-2 transition-colors"
              >
                {l.label}
              </Link>
            ))}
            <div className="flex flex-col gap-2 pt-2 border-t border-slate-800/60">
              <Link to="/login" onClick={() => setMobileOpen(false)} className="text-sm font-semibold text-slate-300 hover:text-white py-2 transition-colors">
                Sign In
              </Link>
              <Button variant="primary" size="sm" onClick={() => { navigate("/register"); setMobileOpen(false); }} className="font-bold w-full">
                Get Started Free
              </Button>
            </div>
          </div>
        )}
      </header>

      {/* Page content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* ── Mega Footer ── */}
      <footer className="border-t border-slate-800/60 bg-slate-950/40">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
            {/* Brand column */}
            <div className="lg:col-span-2 space-y-4">
              <Link to="/" className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
                  <Compass className="w-4.5 h-4.5 text-white animate-spin-slow" />
                </div>
                <span className="text-base font-black tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                  CAREER COMPASS
                </span>
              </Link>
              <p className="text-sm text-slate-400 leading-relaxed max-w-xs">
                AI-powered career intelligence platform helping professionals navigate smarter career decisions with data-driven insights.
              </p>
              <div className="flex gap-3">
                {/* Social icons */}
                {[
                  { label: "Twitter/X", icon: "𝕏" },
                  { label: "LinkedIn", icon: "in" },
                  { label: "GitHub", icon: "⌥" },
                ].map((s) => (
                  <a
                    key={s.label}
                    href="#"
                    aria-label={s.label}
                    className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-xs font-bold text-slate-400 hover:text-white hover:border-slate-700 transition-all"
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Product */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-white uppercase tracking-widest">Product</h4>
              <ul className="space-y-2.5">
                {[
                  { label: "Features", to: "/#features" },
                  { label: "Job Matching", to: "/register" },
                  { label: "Career Paths", to: "/register" },
                  { label: "Resume Analyzer", to: "/register" },
                  { label: "Salary Insights", to: "/register" },
                  { label: "Skill Gap Analysis", to: "/register" },
                ].map((l) => (
                  <li key={l.label}>
                    <Link to={l.to} className="text-sm text-slate-400 hover:text-white transition-colors">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-white uppercase tracking-widest">Company</h4>
              <ul className="space-y-2.5">
                {[
                  { label: "About Us", to: "/about" },
                  { label: "Mission & Vision", to: "/about#mission" },
                  { label: "Contact Us", to: "/contact" },
                  { label: "FAQ", to: "/faq" },
                ].map((l) => (
                  <li key={l.label}>
                    <Link to={l.to} className="text-sm text-slate-400 hover:text-white transition-colors">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-white uppercase tracking-widest">Legal</h4>
              <ul className="space-y-2.5">
                {[
                  { label: "Privacy Policy", to: "/privacy" },
                  { label: "Terms of Service", to: "/terms" },
                  { label: "Cookie Policy", to: "/cookies" },
                ].map((l) => (
                  <li key={l.label}>
                    <Link to={l.to} className="text-sm text-slate-400 hover:text-white transition-colors">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Newsletter */}
              <div className="pt-4 space-y-2">
                <p className="text-xs font-bold text-white uppercase tracking-widest">Stay Updated</p>
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="flex-1 min-w-0 bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500/50 transition-colors"
                  />
                  <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-2 rounded-lg transition-colors shrink-0">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-slate-800/60 px-6 py-5">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-slate-500">
              © {new Date().getFullYear()} Career Compass. All rights reserved. Built with ❤️ and AI.
            </p>
            <div className="flex gap-5 text-xs text-slate-500">
              <Link to="/privacy" className="hover:text-slate-300 transition-colors">Privacy</Link>
              <Link to="/terms" className="hover:text-slate-300 transition-colors">Terms</Link>
              <Link to="/cookies" className="hover:text-slate-300 transition-colors">Cookies</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
