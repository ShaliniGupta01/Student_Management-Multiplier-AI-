import axios from "axios";

const API = axios.create({
  baseURL: "https://student-management-multiplier-ai.onrender.com", // FastAPI backend
});

// Add JWT token to headers automatically
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;