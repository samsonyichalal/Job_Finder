import React from "react";
import { LogOut, User as UserIcon, Menu } from "lucide-react";
import useAuth from "../../hooks/useAuth";

export default function Navbar({ onMenuClick }) {
  const { user, logout } = useAuth();
  const userName = user?.full_name || "Professional";

  return (
    <header className="bg-background/80 backdrop-blur-md border-b border-border/80 sticky top-0 z-40 w-full px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        {/* Mobile menu trigger */}
        <button
          onClick={onMenuClick}
          className="text-muted hover:text-white p-1 hover:bg-card/50 rounded-lg lg:hidden transition-colors"
        >
          <Menu size={20} />
        </button>

        <div className="flex items-center gap-2 select-none">
          <span className="text-xl">🧭</span>
          <span className="text-lg font-extrabold tracking-wider bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            CAREER COMPASS
          </span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden sm:flex items-center gap-2.5 px-3 py-1.5 bg-card/60 border border-border/60 rounded-lg">
          <div className="w-6 h-6 rounded-full bg-secondary/20 flex items-center justify-center text-xs font-bold text-secondary">
            {userName.charAt(0)}
          </div>
          <span className="text-sm font-semibold text-text">{userName}</span>
        </div>

        <button
          onClick={logout}
          title="Logout"
          className="text-muted hover:text-danger p-2 hover:bg-danger/10 border border-transparent hover:border-danger/20 rounded-lg transition-all duration-300"
        >
          <LogOut size={16} />
        </button>
      </div>
    </header>
  );
}
