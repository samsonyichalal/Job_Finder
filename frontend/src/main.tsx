import { StrictMode, Suspense, lazy } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import "./index.css";

import App from "./App.jsx";
const PublicLayout = lazy(() => import("./components/layout/PublicLayout.jsx"));
const ProtectedLayout = lazy(() => import("./components/layout/ProtectedLayout.jsx"));
const RoleRoute = lazy(() => import("./components/layout/RoleRoute.jsx"));

const Landing = lazy(() => import("./pages/Landing.jsx"));
const Login = lazy(() => import("./pages/Login.jsx"));
const Register = lazy(() => import("./pages/Register.jsx"));
const Onboarding = lazy(() => import("./pages/Onboarding.jsx"));
const About = lazy(() => import("./pages/public/About.jsx"));
const FAQ = lazy(() => import("./pages/public/FAQ.jsx"));
const Contact = lazy(() => import("./pages/public/Contact.jsx"));
const Privacy = lazy(() => import("./pages/public/Privacy.jsx"));
const Terms = lazy(() => import("./pages/public/Terms.jsx"));
const Cookies = lazy(() => import("./pages/public/Cookies.jsx"));

const Dashboard = lazy(() => import("./pages/Dashboard.jsx"));
const Jobs = lazy(() => import("./pages/Jobs.jsx"));
const Career = lazy(() => import("./pages/Career.jsx"));
const Skills = lazy(() => import("./pages/Skills.jsx"));
const Resume = lazy(() => import("./pages/Resume.jsx"));
const Salary = lazy(() => import("./pages/Salary.jsx"));
const Courses = lazy(() => import("./pages/Courses.jsx"));
const Profile = lazy(() => import("./pages/Profile.jsx"));

const PosterDashboard = lazy(() => import("./pages/poster/PosterDashboard.jsx"));
const PostJob = lazy(() => import("./pages/poster/PostJob.jsx"));
const MyJobs = lazy(() => import("./pages/poster/MyJobs.jsx"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard.jsx"));
const AdminUsers = lazy(() => import("./pages/admin/AdminUsers.jsx"));
const AdminJobs = lazy(() => import("./pages/admin/AdminJobs.jsx"));
const AdminCourses = lazy(() => import("./pages/admin/AdminCourses.jsx"));

const RouteLoader = () => (
  <div className="min-h-[30vh] flex items-center justify-center">
    <div className="flex items-center gap-2 text-sm text-muted animate-pulse">
      <span>Loading</span>
      <span>...</span>
    </div>
  </div>
);

const withSuspense = (element) => (
  <Suspense fallback={<RouteLoader />}>{element}</Suspense>
);

const router = createBrowserRouter([
  {
    // App = root wrapper with AuthProvider
    element: <App />,
    children: [
      // Auth screens (no shared layout)
      { path: "/login", element: withSuspense(<Login />) },
      { path: "/register", element: withSuspense(<Register />) },
      { path: "/onboarding", element: withSuspense(<Onboarding />) },

      // Public pages — shared navbar + mega footer
      {
        element: withSuspense(<PublicLayout />),
        children: [
          { path: "/", element: withSuspense(<Landing />) },
          { path: "/about", element: withSuspense(<About />) },
          { path: "/faq", element: withSuspense(<FAQ />) },
          { path: "/contact", element: withSuspense(<Contact />) },
          { path: "/privacy", element: withSuspense(<Privacy />) },
          { path: "/terms", element: withSuspense(<Terms />) },
          { path: "/cookies", element: withSuspense(<Cookies />) },
        ],
      },

      // Protected pages — auth guard + app shell (Navbar + Sidebar)
      {
        element: withSuspense(<ProtectedLayout />),
        children: [
          {
            element: withSuspense(<RoleRoute allowedRoles={["job_finder"]} redirectTo="/poster/dashboard" />),
            children: [
              { path: "/dashboard", element: withSuspense(<Dashboard />) },
              { path: "/jobs", element: withSuspense(<Jobs />) },
              { path: "/career", element: withSuspense(<Career />) },
              { path: "/skills", element: withSuspense(<Skills />) },
              { path: "/resume", element: withSuspense(<Resume />) },
              { path: "/salary", element: withSuspense(<Salary />) },
              { path: "/courses", element: withSuspense(<Courses />) },
              { path: "/profile", element: withSuspense(<Profile />) },
            ],
          },
          {
            element: withSuspense(<RoleRoute allowedRoles={["job_poster"]} redirectTo="/dashboard" />),
            children: [
              { path: "/poster/dashboard", element: withSuspense(<PosterDashboard />) },
              { path: "/poster/post-job", element: withSuspense(<PostJob />) },
              { path: "/poster/jobs", element: withSuspense(<MyJobs />) },
            ],
          },
          {
            element: withSuspense(<RoleRoute allowedRoles={["admin"]} redirectTo="/dashboard" />),
            children: [
              { path: "/admin/dashboard", element: withSuspense(<AdminDashboard />) },
              { path: "/admin/users", element: withSuspense(<AdminUsers />) },
              { path: "/admin/jobs", element: withSuspense(<AdminJobs />) },
              { path: "/admin/courses", element: withSuspense(<AdminCourses />) },
            ],
          },
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
