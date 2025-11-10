import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import bookingService from "../../services/bookingService";
import BookingRow from "../../components/customer/BookingRow";
import { motion } from "framer-motion";
import { PlusCircle } from "lucide-react";
import LoadingSpinner from "../../components/common/LoadingSpinner";

const Bookings = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const res = await bookingService.getMyBookings();
      const data = res.data.map((b) => ({
        ...b,
        gameDuration: b.gameDuration || 60,
      }));
      setBookings(data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Không thể tải lịch sử booking");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleEdit = (booking) => {
    navigate(`/booking/edit/${booking.id}`);
  };

  const handleCancel = async (id) => {
    if (!window.confirm("Bạn có chắc chắn muốn hủy booking này?")) return;
    try {
      await bookingService.cancelBooking(id);
      fetchBookings();
    } catch (err) {
      alert("Lỗi khi hủy booking");
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa booking này?")) return;
    try {
      await bookingService.deleteBooking(id);
      fetchBookings();
    } catch (err) {
      alert("Lỗi khi xóa booking");
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center p-10 font-display text-vr-blue text-2xl gap-4">
        <div className="flex justify-center items-center gap-3">
          <LoadingSpinner />
          <span>Đang tải lịch sử đặt phòng...</span>
        </div>
      </div>
    );
  }

  if (error)
    return <div className="text-center p-10 text-red-400">Lỗi: {error}</div>;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      <div className="flex justify-between items-center border-b border-vr-blue/50 pb-4">
        <h2 className="text-5xl font-display font-bold text-white">
          Lịch Sử Đặt Phòng
        </h2>
        <button
          onClick={() => navigate("/booking/new")}
          className="px-6 py-3 bg-cyan-500 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-600 transition duration-200 flex items-center space-x-2"
        >
          <PlusCircle size={18} className="mr-2" />
          <span>Đặt phòng mới</span>
        </button>
      </div>

      <div className="card-base overflow-x-auto p-0">
        <table className="min-w-full divide-y divide-glass">
          <thead className="bg-glass">
            <tr>
              <th className="p-4 text-left text-xs font-medium text-gray-400 uppercase">
                ID
              </th>
              <th className="p-4 text-left text-xs font-medium text-gray-400 uppercase">
                Game / Phòng
              </th>
              <th className="p-4 text-left text-xs font-medium text-gray-400 uppercase">
                Thời gian
              </th>
              <th className="p-4 text-center text-xs font-medium text-gray-400 uppercase">
                Số người
              </th>
              <th className="p-4 text-left text-xs font-medium text-gray-400 uppercase">
                Tổng tiền
              </th>
              <th className="p-4 text-center text-xs font-medium text-gray-400 uppercase">
                Trạng thái
              </th>
              <th className="p-4 text-center text-xs font-medium text-gray-400 uppercase">
                Thanh toán
              </th>
              <th className="p-4 text-right text-xs font-medium text-gray-400 uppercase">
                Hành động
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-glass">
            {bookings.length > 0 ? (
              bookings.map((b) => (
                <BookingRow
                  key={b.id}
                  booking={b}
                  onEdit={handleEdit}
                  onCancel={handleCancel}
                  onDelete={handleDelete}
                />
              ))
            ) : (
              <tr>
                <td colSpan="7" className="p-6 text-center text-gray-500">
                  Bạn chưa có lịch đặt nào.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default Bookings;
