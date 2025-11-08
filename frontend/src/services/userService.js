import axiosInstance from "../api/axios";

const userService = {
  getAllUsers: () => axiosInstance.get("/users"),

  getUserById: (id) => axiosInstance.get(`/users/${id}`),

  createUser: (userData) => axiosInstance.post("/users", userData),

  updateUser: (id, userData) => axiosInstance.put(`/users/${id}`, userData),

  deleteUser: (id) => axiosInstance.delete(`/users/${id}`),
};

export default userService;
