import React from "react";
import { Outlet } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

/**
 * Root layout — AuthProvider wraps ALL routes so every page
 * (Landing, Login, Register, protected pages) can call useAuth().
 * Routing is defined in main.tsx via createBrowserRouter.
 */
export default function App() {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
}
