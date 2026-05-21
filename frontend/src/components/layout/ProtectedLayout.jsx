import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import MobileBottomNav from "./MobileBottomNav";
import { UserProvider } from "../../context/UserContext";

export default function ProtectedLayout() {
  const { isAuthenticated, isLoading, user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.localStorage.getItem("career_compass_sidebar_collapsed") === "1";
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem("career_compass_sidebar_collapsed", isSidebarCollapsed ? "1" : "0");
  }, [isSidebarCollapsed]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/30 animate-pulse">
            <span className="text-white text-lg">🧭</span>
          </div>
          <p className="text-muted text-sm font-medium animate-pulse">Loading Career Compass...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <UserProvider>
      <div className="min-h-screen bg-background text-text flex flex-col relative overflow-hidden">
        <div className="pointer-events-none absolute -top-20 -left-20 w-72 h-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 right-0 w-72 h-72 rounded-full bg-secondary/10 blur-3xl" />
        <Navbar
          onMenuClick={() => setSidebarOpen(true)}
          isSidebarCollapsed={isSidebarCollapsed}
          onToggleSidebarCollapse={() => setIsSidebarCollapsed((prev) => !prev)}
        />
        <div className="flex flex-1 overflow-hidden relative z-10">
          <Sidebar
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
            role={user?.role || "job_finder"}
            isCollapsed={isSidebarCollapsed}
            onToggleCollapse={() => setIsSidebarCollapsed((prev) => !prev)}
          />
          <main className="flex-1 overflow-y-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 pb-24 lg:pb-8">
              <Outlet />
            </div>
          </main>
        </div>
        <MobileBottomNav role={user?.role || "job_finder"} />
        <Footer />
      </div>
    </UserProvider>
  );
}
