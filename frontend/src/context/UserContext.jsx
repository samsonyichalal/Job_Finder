import React, { createContext, useState, useEffect, useContext } from "react";
import careerService from "../services/careerService";
import { AuthContext } from "./AuthContext";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const { isAuthenticated, setUser: setAuthUser } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchProfile = async () => {
    if (!isAuthenticated) return;
    setIsLoading(true);
    try {
      const data = await careerService.getProfile();
      setProfile(data);
      setAuthUser(data);
    } catch (error) {
      console.error("Failed to load profile in UserContext", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchProfile();
    } else {
      setProfile(null);
    }
  }, [isAuthenticated]);

  const updateProfile = async (fields) => {
    setIsLoading(true);
    try {
      await careerService.updateProfile(fields);
      await fetchProfile();
      return true;
    } catch (error) {
      console.error("Profile update failed", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const saveProfile = async (fullProfile) => {
    setIsLoading(true);
    try {
      await careerService.saveProfile(fullProfile);
      await fetchProfile();
      return true;
    } catch (error) {
      console.error("Profile save failed", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <UserContext.Provider value={{ profile, isLoading, fetchProfile, updateProfile, saveProfile }}>
      {children}
    </UserContext.Provider>
  );
};
