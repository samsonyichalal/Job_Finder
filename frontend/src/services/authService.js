import api from "./api";

const authService = {
  register: async (email, password, full_name) => {
    const response = await api.post("/auth/register", { email, password, full_name });
    return response.data;
  },
  login: async (email, password) => {
    const response = await api.post("/auth/login", { email, password });
    return response.data;
  }
};

export default authService;
