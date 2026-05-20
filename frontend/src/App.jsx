import React from "react";
import { NavLink, Outlet, BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="flex flex-col min-h-screen bg-[#0F0E1A] text-white">
          <Navbar />
          <main className="flex-1">
            <Outlet />
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
}

// Route definitions are placed in src/main.jsx where the app is rendered.
