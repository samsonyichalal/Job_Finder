import api from "./api";

const careerService = {
  getProfile: async () => {
    const response = await api.get("/api/profile");
    return response.data;
  },
  saveProfile: async (profileData) => {
    const response = await api.post("/api/profile", profileData);
    return response.data;
  },
  updateProfile: async (partialFields) => {
    const response = await api.put("/api/profile", partialFields);
    return response.data;
  },
  getJobMatches: async () => {
    const response = await api.get("/api/jobs/match");
    return response.data;
  },
  getCareerPaths: async () => {
    const response = await api.get("/api/career/paths");
    return response.data;
  },
  getSkillsGap: async (jobId = null) => {
    const params = jobId ? { job_id: jobId } : {};
    const response = await api.get("/api/skills/gap", { params });
    return response.data;
  },
  analyzeResume: async (resumeText) => {
    const response = await api.post("/api/resume/analyze", { resume_text: resumeText });
    return response.data;
  },
  getSalaryEstimate: async (role, location, level) => {
    const response = await api.get("/api/salary/estimate", {
      params: { role, location, level }
    });
    return response.data;
  },
  getRecommendedCourses: async () => {
    const response = await api.get("/api/courses/recommend");
    return response.data;
  },
  getSavedCourses: async () => {
    const response = await api.get("/api/courses/saved");
    return response.data;
  },
  saveCourse: async (courseId, status = "saved") => {
    const response = await api.post("/api/courses/save", { course_id: courseId, status });
    return response.data;
  },
  updateSavedCourse: async (savedCourseId, status) => {
    const response = await api.put(`/api/courses/saved/${savedCourseId}`, { status });
    return response.data;
  },
  deleteSavedCourse: async (savedCourseId) => {
    const response = await api.delete(`/api/courses/saved/${savedCourseId}`);
    return response.data;
  },
  getPosterStats: async () => {
    const response = await api.get("/api/poster/stats");
    return response.data;
  },
  getPosterJobs: async () => {
    const response = await api.get("/api/poster/jobs");
    return response.data;
  },
  createPosterJob: async (jobData) => {
    const response = await api.post("/api/poster/jobs", jobData);
    return response.data;
  },
  updatePosterJob: async (jobId, jobData) => {
    const response = await api.put(`/api/poster/jobs/${jobId}`, jobData);
    return response.data;
  },
  deletePosterJob: async (jobId) => {
    const response = await api.delete(`/api/poster/jobs/${jobId}`);
    return response.data;
  },
  getAdminStats: async () => {
    const response = await api.get("/api/admin/stats");
    return response.data;
  },
  getAdminUsers: async () => {
    const response = await api.get("/api/admin/users");
    return response.data;
  },
  updateAdminUserRole: async (userId, role) => {
    const response = await api.put(`/api/admin/users/${userId}/role`, { role });
    return response.data;
  },
  getAdminJobs: async () => {
    const response = await api.get("/api/admin/jobs");
    return response.data;
  },
  deleteAdminJob: async (jobId) => {
    const response = await api.delete(`/api/admin/jobs/${jobId}`);
    return response.data;
  },
  getAdminCourses: async () => {
    const response = await api.get("/api/admin/courses");
    return response.data;
  },
  createAdminCourse: async (payload) => {
    const response = await api.post("/api/admin/courses", payload);
    return response.data;
  },
  deleteAdminCourse: async (courseId) => {
    const response = await api.delete(`/api/admin/courses/${courseId}`);
    return response.data;
  }
};

export default careerService;
