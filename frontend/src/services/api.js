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
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      Navigate('/login');
    }
    return Promise.reject(error);
  }
);

export const loginAdmin = (formData) => API.post("/auth/login", formData);
export const signupUser = (formData) => API.post("/auth/signup", formData);
export const getDashboardStats = () => API.get("/dashboard/stats");
