export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

export const COLOR_MAP = {
  High: "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30",
  Medium: "bg-amber-500/20 text-amber-400 border border-amber-500/30",
  Low: "bg-rose-500/20 text-rose-400 border border-rose-500/30"
};

export const PLATFORM_ICONS = {
  Coursera: "🎓",
  Udemy: "💻",
  edX: "🏫",
  YouTube: "📺",
  freeCodeCamp: "🔥",
  "LinkedIn Learning": "💼"
};
