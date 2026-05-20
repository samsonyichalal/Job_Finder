import { useState, useEffect } from "react";
import careerService from "../services/careerService";
import useAuth from "./useAuth";

export default function useJobs() {
  const { isAuthenticated } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchJobs = async () => {
    if (!isAuthenticated) return;
    setIsLoading(true);
    setError(null);
    try {
      const data = await careerService.getJobMatches();
      setJobs(data || []);
    } catch (err) {
      console.error("Failed to load jobs match", err);
      setError(err.response?.data?.detail || "Could not retrieve matches.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchJobs();
    }
  }, [isAuthenticated]);

  return { jobs, isLoading, error, refetchJobs: fetchJobs };
}
