import React from "react";
import { NavLink } from "react-router-dom";
import { Award, BookOpen, Briefcase, LayoutDashboard, PlusCircle, Shield, Users } from "lucide-react";

export default function MobileBottomNav({ role = "job_finder" }) {
  const seekerTabs = [
    { name: "Home", path: "/dashboard", icon: LayoutDashboard },
    { name: "Jobs", path: "/jobs", icon: Briefcase },
    { name: "Skills", path: "/skills", icon: Award },
    { name: "Courses", path: "/courses", icon: BookOpen },
  ];

  const posterTabs = [
    { name: "Home", path: "/poster/dashboard", icon: LayoutDashboard },
    { name: "Post", path: "/poster/post-job", icon: PlusCircle },
    { name: "Jobs", path: "/poster/jobs", icon: Briefcase },
  ];

  const adminTabs = [
    { name: "Home", path: "/admin/dashboard", icon: Shield },
    { name: "Users", path: "/admin/users", icon: Users },
    { name: "Jobs", path: "/admin/jobs", icon: Briefcase },
    { name: "Courses", path: "/admin/courses", icon: BookOpen },
  ];

  const tabMap = {
    job_finder: seekerTabs,
    job_poster: posterTabs,
    admin: adminTabs,
  };

  const tabs = tabMap[role] || seekerTabs;

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 border-t border-border/80 bg-background/90 backdrop-blur-xl px-2 pb-[max(env(safe-area-inset-bottom),0.25rem)] pt-1.5">
      <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${tabs.length}, minmax(0, 1fr))` }}>
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <NavLink
              key={tab.path}
              to={tab.path}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center rounded-lg py-2.5 transition-all ${
                  isActive
                    ? "text-white bg-primary/15 border border-primary/30"
                    : "text-muted border border-transparent"
                }`
              }
            >
              <Icon size={16} />
              <span className="text-[10px] font-semibold mt-1 tracking-wide">{tab.name}</span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}
