import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import "./index.css";

import App from "./App.jsx";
import PublicLayout from "./components/layout/PublicLayout.jsx";
import ProtectedLayout from "./components/layout/ProtectedLayout.jsx";

// Public pages
import Landing from "./pages/Landing.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Onboarding from "./pages/Onboarding.jsx";
import About from "./pages/public/About.jsx";
import FAQ from "./pages/public/FAQ.jsx";
import Contact from "./pages/public/Contact.jsx";
import Privacy from "./pages/public/Privacy.jsx";
import Terms from "./pages/public/Terms.jsx";
import Cookies from "./pages/public/Cookies.jsx";

// Protected pages
import Dashboard from "./pages/Dashboard.jsx";
import Jobs from "./pages/Jobs.jsx";
import Career from "./pages/Career.jsx";
import Skills from "./pages/Skills.jsx";
import Resume from "./pages/Resume.jsx";
import Salary from "./pages/Salary.jsx";
import Courses from "./pages/Courses.jsx";
import Profile from "./pages/Profile.jsx";

const router = createBrowserRouter([
  {
    // App = root wrapper with AuthProvider
    element: <App />,
    children: [
      // Auth screens (no shared layout)
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/onboarding", element: <Onboarding /> },

      // Public pages — shared navbar + mega footer
      {
        element: <PublicLayout />,
        children: [
          { path: "/", element: <Landing /> },
          { path: "/about", element: <About /> },
          { path: "/faq", element: <FAQ /> },
          { path: "/contact", element: <Contact /> },
          { path: "/privacy", element: <Privacy /> },
          { path: "/terms", element: <Terms /> },
          { path: "/cookies", element: <Cookies /> },
        ],
      },

      // Protected pages — auth guard + app shell (Navbar + Sidebar)
      {
        element: <ProtectedLayout />,
        children: [
          { path: "/dashboard", element: <Dashboard /> },
          { path: "/jobs", element: <Jobs /> },
          { path: "/career", element: <Career /> },
          { path: "/skills", element: <Skills /> },
          { path: "/resume", element: <Resume /> },
          { path: "/salary", element: <Salary /> },
          { path: "/courses", element: <Courses /> },
          { path: "/profile", element: <Profile /> },
        ],
      },

      { path: "*", element: <Navigate to="/" replace /> },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
