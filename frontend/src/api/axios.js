import axios from "axios";

const BASE_API = import.meta.env.VITE_API_URL;

const axiosInstance = axios.create({
  baseURL: BASE_API,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    if (error.response) {
      const status = error.response.status;

      if (status === 401) {
        sessionStorage.removeItem("token");
        console.log("Token hết hạn hoặc chưa đăng nhập");
      }

      if (status === 403) {
        console.log("Không có quyền truy cập");
      }

      if (status >= 500) {
        console.log("Lỗi phía Server");
      }
    } else {
      console.log("Không kết nối được server");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
