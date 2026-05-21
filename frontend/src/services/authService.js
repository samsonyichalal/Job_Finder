import api from "./api";

const authService = {
  register: async (email, password, full_name, role = "job_finder") => {
    const response = await api.post("/auth/register", { email, password, full_name, role });
    return response.data;
  },
  login: async (email, password) => {
    const response = await api.post("/auth/login", { email, password });
    return response.data;
  }
};

export default authService;
