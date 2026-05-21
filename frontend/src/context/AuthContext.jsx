import React, { createContext, useState, useEffect } from "react";
import authService from "../services/authService";
import careerService from "../services/careerService";

export const AuthContext = createContext();

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
            setUser(profile);
            setIsAuthenticated(true);
          } else {
            logout();
          }
        } catch (error) {
          console.error("Token verification failed", error);
          logout();
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
      setToken(data.token);
      setIsAuthenticated(true);
      const profile = await careerService.getProfile();
      setUser(profile ? { ...profile, role: profile.role || data.role || "job_finder" } : { role: data.role || "job_finder" });
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
      setToken(data.token);
      setIsAuthenticated(true);
      const profile = await careerService.getProfile();
      setUser(profile ? { ...profile, role: profile.role || data.role || role } : { role: data.role || role });
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
