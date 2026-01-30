import axios from "axios";

const API = axios.create({
  baseURL: "https://watch-mernproject.onrender.com/api", // Local development backend
  withCredentials: true, // cookies / jwt ke liye
});

// Add request interceptor for debugging
API.interceptors.request.use(
  (config) => {
    console.log(`Making ${config.method?.toUpperCase()} request to:`, config.url);
    console.log('Request data:', config.data);
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for debugging
API.interceptors.response.use(
  (response) => {
    console.log(`Response from ${response.config.url}:`, response.status, response.data);
    return response;
  },
  (error) => {
    console.error(`Error from ${error.config?.url}:`, error.response?.status, error.response?.data);
    return Promise.reject(error);
  }
);

export default API;
