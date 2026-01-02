import axios from "axios";
import { Navigate } from "react-router-dom";

const API = axios.create({ baseURL: import.meta.env.VITE_API_URL });

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

API.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);

export default API;

export const loginAdmin = (formData) => API.post("/auth/login", formData);
export const signupUser = (formData) => API.post("/auth/signup", formData);
export const getDashboardStats = () => API.get("/dashboard/stats");
export const getJobWorkTypes = () => API.get("/job-work/types");
export const addJobWorkType = (data) => API.post("/job-work/types", data);
export const updateJobWorkType = (id, data) => API.put(`/job-work/types/${id}`, data);
