import axiosInstance from "../api/axios";

const bookingService = {
  getAllBookings: () => axiosInstance.get("/bookings"),

  getBookingById: (id) => axiosInstance.get(`/bookings/${id}`),

  getMyBookings: () => axiosInstance.get("/bookings/user/me"),


  createBooking: (bookingData) => axiosInstance.post("/bookings", bookingData),

  updateBooking: (id, bookingData) =>
    axiosInstance.put(`/bookings/${id}`, bookingData),

  confirmPayment: (id) => axiosInstance.patch(`/bookings/${id}/pay`),

  cancelBooking: (id) => axiosInstance.patch(`/bookings/${id}/cancel`),

  acceptBooking: (id) => axiosInstance.patch(`/bookings/${id}/accept`),

  deleteBooking: (id) => axiosInstance.delete(`/bookings/${id}`),
};

export default bookingService;
