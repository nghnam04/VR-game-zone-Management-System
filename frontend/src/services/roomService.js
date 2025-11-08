import axiosInstance from "../api/axios";

const roomService = {
  getAllRooms: () => axiosInstance.get("/rooms"),

  getRoomById: (id) => axiosInstance.get(`/rooms/${id}`),

  createRoom: (roomData) => axiosInstance.post("/rooms", roomData),

  updateRoom: (id, roomData) => axiosInstance.put(`/rooms/${id}`, roomData),

  deleteRoom: (id) => axiosInstance.delete(`/rooms/${id}`),
};

export default roomService;
