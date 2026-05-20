import React from "react";
import { NavLink } from "react-router-dom";
import { 
  LayoutDashboard, 
  Briefcase, 
  TrendingUp, 
  Award, 
  FileText, 
  DollarSign, 
  GraduationCap,
  ChevronLeft,
  X
} from "lucide-react";

export default function Sidebar({ isOpen, onClose }) {
  const menuItems = [
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "Job Matches", path: "/jobs", icon: Briefcase },
    { name: "Career Paths", path: "/career", icon: TrendingUp },
    { name: "Skills Gap", path: "/skills", icon: Award },
    { name: "Resume Analyzer", path: "/resume", icon: FileText },
    { name: "Salary Insights", path: "/salary", icon: DollarSign },
    { name: "Online Courses", path: "/courses", icon: GraduationCap }
  ];

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
        className={`fixed top-0 bottom-0 left-0 z-40 w-64 bg-background border-r border-border/80 flex flex-col pt-24 lg:pt-0 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:h-[calc(100vh-73px)] ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Close mobile sidebar */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-muted hover:text-white lg:hidden p-1.5 hover:bg-card/50 rounded-lg"
        >
          <X size={18} />
        </button>

        <nav className="flex-1 px-4 py-6 flex flex-col gap-1.5 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3.5 px-4 py-3 rounded-lg text-sm font-semibold transition-all duration-300 ${
                    isActive
                      ? "bg-primary/10 text-white border border-primary/20 shadow-md shadow-primary/5 font-bold"
                      : "text-muted hover:text-white hover:bg-card/40 border border-transparent"
                  }`
                }
              >
                <Icon size={18} />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
