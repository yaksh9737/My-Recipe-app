import axios from "axios";

// Create an Axios instance with the base URL
const api = axios.create({
  baseURL: "http://localhost:7890/api", // Ensure this matches your backend URL
});

// Export baseURL for use in other components
export const BASE_URL = "http://localhost:7890/api";

// Add a request interceptor to include token in requests (if necessary)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
