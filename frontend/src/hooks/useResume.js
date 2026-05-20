import { useState } from "react";
import careerService from "../services/careerService";

export default function useResume() {
  const [analysis, setAnalysis] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const analyzeResume = async (resumeText) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await careerService.analyzeResume(resumeText);
      setAnalysis(data);
      return data;
    } catch (err) {
      console.error("Resume analysis failed", err);
      setError(err.response?.data?.detail || "Could not analyze resume. Make sure your profile is completed.");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { analysis, isLoading, error, analyzeResume, setAnalysis };
}
