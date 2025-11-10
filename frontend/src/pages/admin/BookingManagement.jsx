import { useState, useEffect } from "react";
import axiosInstance from "../../api/axios";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import BookingItem from "../../components/admin/BookingItem";

const BookingManagement = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/bookings");
      setBookings(response.data);
      setError(null);
    } catch (err) {
      setError("Không thể tải danh sách Đặt phòng.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // accept / cancel
  const handleAction = async (bookingId, action, endpoint) => {
    const actionName = action === "accept" ? "Duyệt" : "Hủy";
    if (
      !window.confirm(
        `Bạn có chắc muốn ${actionName} Booking ID: ${bookingId}?`
      )
    )
      return;

    try {
      await axiosInstance.patch(`/bookings/${bookingId}/${endpoint}`);
      alert(`${actionName} Booking thành công!`);
      fetchBookings();
    } catch (err) {
      alert(`Lỗi khi ${actionName.toLowerCase()} Booking.`);
      console.error(`Lỗi ${actionName.toLowerCase()} Booking:`, err);
    }
  };

  const handleDelete = async (bookingId) => {
    if (!window.confirm(`Bạn có chắc chắn muốn xóa Booking ID: ${bookingId}?`))
      return;

    try {
      await axiosInstance.delete(`/bookings/${bookingId}`);
      alert("Xóa Booking thành công!");
      fetchBookings();
    } catch (err) {
      alert(
        "Lỗi khi xóa Booking. Không thể xóa Booking ACCEPTED có trạng thái thanh toán PAID."
      );
      console.error("Lỗi xóa Booking:", err);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center p-10 font-display text-vr-blue text-2xl gap-4">
        <div className="flex justify-center items-center gap-3">
          <LoadingSpinner />
          <span>Đang tải chi tiết đơn đặt phòng...</span>
        </div>
      </div>
    );
  }

  if (error)
    return (
      <div className="text-red-400 p-4 bg-red-900/30 rounded">{error}</div>
    );

  return (
    <div>
      <h2 className="text-3xl font-display text-white mb-6">
        Quản lý Đặt phòng ({bookings.length})
      </h2>

      <div className="overflow-x-auto card-base p-4">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-800">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                ID
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Khách hàng
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Game
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Phòng
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Thời gian
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Tổng tiền
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Trạng thái
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Thanh toán
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
                Hành động
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800 ">
            {bookings.map((b) => (
              <BookingItem
                key={b.id}
                booking={b}
                handleAction={handleAction}
                handleDelete={handleDelete}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookingManagement;
