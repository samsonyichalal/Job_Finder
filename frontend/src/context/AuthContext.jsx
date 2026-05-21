import React, { createContext, useState, useEffect } from "react";
import authService from "../services/authService";
import careerService from "../services/careerService";

export const AuthContext = createContext();

const isProfileComplete = (profile) => {
  if (!profile) return false;
  return Boolean(
    profile.full_name?.trim() &&
      (profile.skills?.length || profile.education?.length || profile.experience?.length || profile.location?.trim())
  );
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("cc_token"));
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      if (token) {
        try {
          const profile = await careerService.getProfile();
          if (profile) {
            setUser({ ...profile, profileComplete: true });
            setIsAuthenticated(true);
          } else {
            setUser({
              role: localStorage.getItem("cc_role") || "job_finder",
              profileComplete: false,
            });
            setIsAuthenticated(true);
          }
        } catch (error) {
          console.error("Token verification failed", error);
          const status = error?.response?.status;
          if (status === 401) {
            logout();
            return;
          }
          setUser({
            role: localStorage.getItem("cc_role") || "job_finder",
            profileComplete: false,
          });
          setIsAuthenticated(true);
        }
      }
      setIsLoading(false);
    };
    initAuth();
  }, [token]);

  const login = async (email, password) => {
    setIsLoading(true);
    try {
      const data = await authService.login(email, password);
      localStorage.setItem("cc_token", data.token);
      localStorage.setItem("cc_user_id", data.user_id.toString());
      localStorage.setItem("cc_role", data.role || "job_finder");
      setToken(data.token);
      setIsAuthenticated(true);
      const profile = await careerService.getProfile();
      setUser(
        profile
          ? { ...profile, role: profile.role || data.role || "job_finder", profileComplete: true }
          : { role: data.role || "job_finder", profileComplete: false }
      );
      return profile;
    } catch (error) {
      logout();
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email, password, full_name, role = "job_finder") => {
    setIsLoading(true);
    try {
      const data = await authService.register(email, password, full_name, role);
      localStorage.setItem("cc_token", data.token);
      localStorage.setItem("cc_user_id", data.user_id.toString());
      localStorage.setItem("cc_role", data.role || role || "job_finder");
      setToken(data.token);
      setIsAuthenticated(true);
      const profile = await careerService.getProfile();
      setUser(
        profile
          ? { ...profile, role: profile.role || data.role || role, profileComplete: isProfileComplete(profile) }
          : { role: data.role || role, profileComplete: false }
      );
      return profile;
    } catch (error) {
      logout();
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("cc_token");
    localStorage.removeItem("cc_user_id");
    localStorage.removeItem("cc_role");
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated, isLoading, login, register, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
