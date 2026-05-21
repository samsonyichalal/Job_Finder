import React from "react";
import { Link, useLocation } from "react-router-dom";
import { LogOut, Menu, PanelLeftClose, PanelLeftOpen, PlusCircle, User } from "lucide-react";
import useAuth from "../../hooks/useAuth";
import Button from "../ui/Button";

export default function Navbar({ onMenuClick, isSidebarCollapsed = false, onToggleSidebarCollapse }) {
  const location = useLocation();
  const { user, logout } = useAuth();
  const userName = user?.full_name || "Professional";
  const roleLabel = user?.role === "admin" ? "Admin" : user?.role === "job_poster" ? "Employer" : "Job Seeker";

  const routeNameMap = {
    "/dashboard": "Dashboard",
    "/jobs": "Job Matches",
    "/career": "Career Paths",
    "/skills": "Skills Gap",
    "/resume": "Resume Analyzer",
    "/salary": "Salary Insights",
    "/courses": "Online Courses",
    "/profile": "Profile",
    "/poster/dashboard": "Employer Dashboard",
    "/poster/post-job": "Post a Job",
    "/poster/jobs": "My Jobs",
    "/admin/dashboard": "Admin Dashboard",
    "/admin/users": "Manage Users",
    "/admin/jobs": "Manage Jobs",
    "/admin/courses": "Manage Courses",
  };

  const currentPage = routeNameMap[location.pathname] || "Workspace";
  const quickAction = user?.role === "job_poster"
    ? { to: "/poster/post-job", label: "New Job", icon: PlusCircle }
    : user?.role === "admin"
      ? { to: "/admin/users", label: "Users", icon: User }
      : { to: "/profile", label: "Profile", icon: User };

  const QuickActionIcon = quickAction.icon;

  return (
    <header className="bg-background/75 backdrop-blur-xl border-b border-border/80 sticky top-0 z-40 w-full px-4 sm:px-6 py-3.5 flex items-center justify-between">
      <div className="flex items-center gap-3 sm:gap-4 min-w-0">
        {/* Mobile menu trigger */}
        <button
          onClick={onMenuClick}
          className="text-muted hover:text-white p-1.5 hover:bg-card/60 rounded-lg lg:hidden transition-colors"
          aria-label="Open menu"
        >
          <Menu size={20} />
        </button>

        <div className="flex items-center gap-2 select-none shrink-0">
          <span className="text-lg sm:text-xl">🧭</span>
          <span className="text-sm sm:text-lg font-extrabold tracking-wider bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            CAREER COMPASS
          </span>
        </div>

        <div className="hidden md:flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-card/50 border border-border/70">
          <span className="text-[10px] uppercase tracking-[0.18em] text-muted font-bold">Current</span>
          <span className="text-xs font-semibold text-white">{currentPage}</span>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        <button
          onClick={onToggleSidebarCollapse}
          className="hidden lg:inline-flex text-muted hover:text-white p-2 hover:bg-card/60 border border-border/70 rounded-lg transition-colors"
          aria-label={isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          title={isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isSidebarCollapsed ? <PanelLeftOpen size={16} /> : <PanelLeftClose size={16} />}
        </button>

        <Link to={quickAction.to} className="hidden sm:inline-flex">
          <Button variant="ghost" size="sm" className="flex items-center gap-1.5 border-border/80">
            <QuickActionIcon size={14} />
            {quickAction.label}
          </Button>
        </Link>

        <div className="hidden lg:flex items-center gap-2.5 px-3 py-1.5 bg-card/60 border border-border/60 rounded-lg">
          <div className="w-6 h-6 rounded-full bg-secondary/20 flex items-center justify-center text-xs font-bold text-secondary">
            {userName.charAt(0)}
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-semibold text-text">{userName}</span>
            <span className="text-[10px] uppercase tracking-wider text-muted">{roleLabel}</span>
          </div>
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
