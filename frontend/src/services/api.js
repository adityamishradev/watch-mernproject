import axios from "axios";

// Force local development URL
const BASE_URL = "https://watch-mernproject.onrender.com/api";

console.log("🔧 API Configuration:");
console.log("Base URL:", BASE_URL);

const API = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // cookies / jwt ke liye
});

// Add request interceptor for debugging
API.interceptors.request.use(
  (config) => {
    // If a token is stored in localStorage (login saved it), attach it as Bearer
    // This helps when cookies are not available (cross-origin or blocked).
    const token = localStorage.getItem('token');
    if (token && config && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log(`🚀 Making ${config.method?.toUpperCase()} request to:`, config.baseURL + config.url);
    console.log('📦 Request data:', config.data);
    return config;
  },
  (error) => {
    console.error('❌ Request error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for debugging
API.interceptors.response.use(
  (response) => {
    console.log(`✅ Response from ${response.config.url}:`, response.status, response.data);
    return response;
  },
  (error) => {
    console.error(`❌ Error from ${error.config?.url}:`, error.response?.status, error.response?.data);
    return Promise.reject(error);
  }
);

export default API;
