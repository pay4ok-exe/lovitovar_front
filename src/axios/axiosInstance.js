import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000", // Базовый URL API
  headers: {
    "Content-Type": "application/json",
  },
});

// Интерсептор для добавления токена, если он есть
axiosInstance.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
