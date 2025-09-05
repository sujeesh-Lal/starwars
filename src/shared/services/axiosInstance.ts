import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://www.swapi.tech", // your API base
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Optional: request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // e.g., attach auth token
    // config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error),
);

// Optional: response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error),
);

export default axiosInstance;
