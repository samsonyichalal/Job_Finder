import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export default function RoleRoute({ allowedRoles, redirectTo }) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return null;
  }

  const role = user?.role || "job_finder";
  if (!allowedRoles.includes(role)) {
    const defaultHomeByRole = {
      job_finder: "/dashboard",
      job_poster: "/poster/dashboard",
      admin: "/admin/dashboard",
    };
    return <Navigate to={defaultHomeByRole[role] || redirectTo || "/"} replace />;
  }

  return <Outlet />;
}