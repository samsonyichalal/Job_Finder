import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Briefcase, 
  TrendingUp, 
  Award, 
  FileText, 
  DollarSign, 
  GraduationCap,
  PlusCircle,
  ClipboardList,
  Users,
  Shield,
  BookOpen,
  Compass,
  Sparkles,
  PanelLeftClose,
  PanelLeftOpen,
  X,
} from "lucide-react";

export default function Sidebar({ isOpen, onClose, role = "job_finder", isCollapsed = false, onToggleCollapse }) {
  const location = useLocation();

  const seekerMenuItems = [
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard, hint: "Your career overview" },
    { name: "Job Matches", path: "/jobs", icon: Briefcase, hint: "Live role alignment" },
    { name: "Career Paths", path: "/career", icon: TrendingUp, hint: "Growth trajectories" },
    { name: "Skills Gap", path: "/skills", icon: Award, hint: "What to learn next" },
    { name: "Resume Analyzer", path: "/resume", icon: FileText, hint: "ATS improvement" },
    { name: "Salary Insights", path: "/salary", icon: DollarSign, hint: "Market range lookup" },
    { name: "Online Courses", path: "/courses", icon: GraduationCap, hint: "Gap-closing learning" }
  ];

  const posterMenuItems = [
    { name: "Dashboard", path: "/poster/dashboard", icon: LayoutDashboard, hint: "Hiring summary" },
    { name: "Post a Job", path: "/poster/post-job", icon: PlusCircle, hint: "Create a new role" },
    { name: "My Jobs", path: "/poster/jobs", icon: ClipboardList, hint: "Manage listings" }
  ];

  const adminMenuItems = [
    { name: "Admin Dashboard", path: "/admin/dashboard", icon: Shield, hint: "System metrics" },
    { name: "Manage Users", path: "/admin/users", icon: Users, hint: "Role control" },
    { name: "Manage Jobs", path: "/admin/jobs", icon: Briefcase, hint: "Content moderation" },
    { name: "Manage Courses", path: "/admin/courses", icon: BookOpen, hint: "Catalog quality" }
  ];

  const roleConfig = {
    job_finder: {
      label: "Job Seeker Workspace",
      description: "Discover, optimize, and grow.",
      accent: "from-indigo-500/20 to-cyan-500/10 border-indigo-500/20",
      items: seekerMenuItems,
    },
    job_poster: {
      label: "Employer Workspace",
      description: "Post and manage real openings.",
      accent: "from-emerald-500/20 to-teal-500/10 border-emerald-500/20",
      items: posterMenuItems,
    },
    admin: {
      label: "Admin Control Center",
      description: "Govern users and data quality.",
      accent: "from-amber-500/20 to-rose-500/10 border-amber-500/20",
      items: adminMenuItems,
    },
  };

  const activeRole = roleConfig[role] ? role : "job_finder";
  const menuItems = roleConfig[activeRole].items;

  return (
    <>
      {/* Mobile Backdrop overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 w-72 bg-background/95 backdrop-blur-xl border-r border-border/80 flex flex-col pt-20 lg:pt-0 transform transition-all duration-300 ease-in-out lg:translate-x-0 lg:static lg:h-[calc(100vh-73px)] ${isCollapsed ? "lg:w-20" : "lg:w-72"} ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="px-4 pt-3 pb-4 border-b border-border/60">
          <div className="hidden lg:flex items-center justify-end mb-2">
            <button
              onClick={onToggleCollapse}
              className="p-1.5 rounded-lg border border-border/70 bg-card/40 text-muted hover:text-white hover:bg-card/70 transition-colors"
              aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {isCollapsed ? <PanelLeftOpen size={16} /> : <PanelLeftClose size={16} />}
            </button>
          </div>

          <div className="flex items-center justify-between lg:hidden mb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-md shadow-primary/20">
                <Compass className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm font-black tracking-wide text-white">Career Compass</span>
            </div>
            <button
              onClick={onClose}
              className="text-muted hover:text-white p-1.5 hover:bg-card/60 rounded-lg"
              aria-label="Close menu"
            >
              <X size={18} />
            </button>
          </div>

          <div className={`rounded-2xl border bg-gradient-to-br p-4 ${roleConfig[activeRole].accent} ${isCollapsed ? "lg:hidden" : ""}`}>
            <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-300">Current Mode</p>
            <h3 className="text-sm font-bold text-white mt-1">{roleConfig[activeRole].label}</h3>
            <p className="text-xs text-slate-300/90 mt-1">{roleConfig[activeRole].description}</p>
          </div>
        </div>

        <nav className={`flex-1 py-4 flex flex-col gap-1.5 overflow-y-auto ${isCollapsed ? "px-2" : "px-3"}`}>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isCurrent = location.pathname === item.path;
            return (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `group flex items-center gap-3.5 rounded-xl text-sm transition-all duration-300 border ${isCollapsed ? "px-2 py-2.5 lg:justify-center" : "px-3 py-3"} ${
                    isActive
                      ? "bg-primary/10 text-white border-primary/30 shadow-md shadow-primary/5"
                      : "text-muted hover:text-white hover:bg-card/50 border-transparent hover:border-border/70"
                  }`
                }
                title={isCollapsed ? item.name : undefined}
              >
                <div className={`w-8 h-8 rounded-lg border flex items-center justify-center shrink-0 transition-all ${isCurrent ? "border-primary/40 bg-primary/20 text-primary" : "border-border/70 bg-card/40 text-muted group-hover:text-white group-hover:border-border"}`}>
                  <Icon size={16} />
                </div>
                <div className={`min-w-0 ${isCollapsed ? "lg:hidden" : ""}`}>
                  <p className="font-semibold truncate">{item.name}</p>
                  <p className="text-[11px] text-muted truncate">{item.hint}</p>
                </div>
              </NavLink>
            );
          })}
        </nav>

        <div className={`px-4 pb-4 pt-2 border-t border-border/60 ${isCollapsed ? "lg:hidden" : ""}`}>
          <div className="rounded-xl bg-card/50 border border-border/70 p-3">
            <div className="flex items-center gap-2 text-xs text-slate-300">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              <span className="font-semibold">Tip</span>
            </div>
            <p className="text-[11px] text-muted mt-1 leading-relaxed">
              Keep your profile and catalog data current to improve recommendations and analytics quality.
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
