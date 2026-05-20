import { useState, useEffect } from "react";
import careerService from "../services/careerService";
import useAuth from "./useAuth";

export default function useSkillGap(jobId = null) {
  const { isAuthenticated } = useAuth();
  const [skillGap, setSkillGap] = useState({ has: [], missing: [], partial: [] });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchSkillGap = async (id = jobId) => {
    if (!isAuthenticated) return;
    setIsLoading(true);
    setError(null);
    try {
      const data = await careerService.getSkillsGap(id);
      setSkillGap(data || { has: [], missing: [], partial: [] });
    } catch (err) {
      console.error("Failed to load skill gaps", err);
      setError(err.response?.data?.detail || "Could not retrieve gaps metrics.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchSkillGap(jobId);
    }
  }, [isAuthenticated, jobId]);

  return { skillGap, isLoading, error, refetchSkillGap: fetchSkillGap };
}
