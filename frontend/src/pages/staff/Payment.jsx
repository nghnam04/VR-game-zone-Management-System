import { useState } from "react";
import bookingService from "../../services/bookingService";
import { motion } from "framer-motion";
import LoadingSpinner from "../../components/common/LoadingSpinner";

const Payment = () => {
  const [bookingId, setBookingId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!bookingId) {
      setError("Vui lòng nhập ID Đặt phòng.");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await bookingService.confirmPayment(bookingId);
      setSuccess(
        `Đã xác nhận thanh toán thành công cho Booking ID: ${bookingId}`
      );
      setBookingId("");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          `Không thể xác nhận thanh toán cho ID: ${bookingId}. Chưa tồn tại đơn đặt phòng hoặc trạng thái đơn đặt phòng chưa hợp lệ`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex justify-center items-center min-h-[70vh]"
    >
      <div className="card-base card-glow w-full max-w-lg p-8">
        <h2 className="text-3xl font-display text-center text-vr-blue mb-6">
          Xác Nhận Thanh Toán
        </h2>
        <p className="text-center text-gray-400 mb-4">
          Chức năng dành cho Nhân viên
        </p>

        {error && (
          <div className="bg-red-500/20 text-red-400 p-3 rounded-lg mb-4 text-center">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-500/20 text-green-400 p-3 rounded-lg mb-4 text-center">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Booking ID
            </label>
            <input
              type="number"
              value={bookingId}
              onChange={(e) => setBookingId(e.target.value)}
              className="input-base"
              placeholder="Nhập ID từ đơn đặt phòng của khách hàng"
              required
            />
          </div>
          <div>
            <button
              type="submit"
              className="btn-primary w-full flex items-center justify-center gap-3 py-3 text-lg font-semibold relative"
              disabled={loading}
            >
              {loading ? (
                <>
                  <LoadingSpinner className="w-5 h-5 border-4 border-gray-200 border-t-transparent animate-spin" />
                  <span>Đang xử lý...</span>
                </>
              ) : (
                "Xác Nhận Thanh Toán"
              )}
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default Payment;
