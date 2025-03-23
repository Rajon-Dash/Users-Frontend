import axios from "axios";
// const  REACT_APP_BACKEND_URL= "https://users-backend-production.up.railway.app"
const api = axios.create({
  baseURL:"http://localhost:5000", //  Use environment variable for flexibility
  withCredentials: true, // Allows sending cookies (if using JWT in cookies)
  headers: {
    "Content-Type": "application/json",
  },
});

//  Attach token to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle Unauthorized Errors (Auto-Logout)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token"); // Clear expired token
      // window.location.href = "/login"; // Redirect to login page
    }
    return Promise.reject(error);
  }
);

export default api;


