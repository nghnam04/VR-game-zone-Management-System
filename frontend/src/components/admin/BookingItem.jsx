import formatTime from "../utils/formatTime";
import formatCurrency from "../utils/formatCurrency";
import { CheckCircle, XCircle, Trash2 } from "lucide-react";

const getStatusBadge = (status) => {
  switch (status) {
    case "ACCEPTED":
      return "bg-green-500/30 text-green-300";
    case "PENDING":
      return "bg-yellow-500/30 text-yellow-300";
    case "CANCELLED":
      return "bg-red-500/30 text-red-300";
    default:
      return "bg-gray-500/30 text-gray-300";
  }
};

const getPaymentBadge = (status) => {
  switch (status) {
    case "PAID":
      return "bg-blue-500/30 text-blue-300";
    case "UNPAID":
      return "bg-pink-500/30 text-pink-300";
    default:
      return "bg-gray-500/30 text-gray-300";
  }
};

const BookingItem = ({ booking, handleAction, handleDelete }) => {
  return (
    <>
      <tr className="hover:bg-gray-700/50 transition duration-150 border-b border-gray-800">
        <td className="px-4 py-3 text-sm text-gray-400">{booking.id}</td>

        <td className="px-4 py-3 text-sm text-gray-200">
          {booking.userName || "Người ẩn danh"}
        </td>

        <td className="px-4 py-3 text-sm text-green-400">
          {booking.gameName || "Không có game"}
        </td>

        <td className="px-4 py-3 text-sm text-yellow-400">
          {booking.roomName || "Không có phòng"}
        </td>

        <td className="px-4 py-3 text-sm text-gray-300">
          {formatTime(booking.startTime)}
        </td>

        <td className="px-4 py-3 text-sm text-green-400">
          {formatCurrency(booking.totalAmount)}
        </td>

        <td className="px-4 py-3 text-sm">
          <span
            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadge(
              booking.status
            )}`}
          >
            {booking.status}
          </span>
        </td>

        <td className="px-4 py-3 text-sm">
          <span
            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getPaymentBadge(
              booking.paymentStatus
            )}`}
          >
            {booking.paymentStatus}
          </span>
        </td>

        <td className="w-32 px-4 py-3 text-right text-sm font-medium space-x-2">
          <div className="flex justify-center space-x-3">
            {booking.status === "PENDING" ? (
              <button
                onClick={() => handleAction(booking.id, "accept", "accept")}
                className="text-green-400 hover:text-green-300 transition duration-150"
                title="Duyệt Booking"
              >
                <CheckCircle size={18} />
              </button>
            ) : (
              // giữ chỗ
              <span
                className="w-[18px] h-[18px] inline-block"
                aria-hidden="true"
              ></span>
            )}

            {booking.status !== "CANCELLED" && booking.status !== "ACCEPTED" ? (
              <button
                onClick={() => handleAction(booking.id, "cancel", "cancel")}
                className="text-yellow-400 hover:text-yellow-300 transition duration-150"
                title="Hủy Booking"
              >
                <XCircle size={18} />
              </button>
            ) : (
              // giữ chỗ
              <span
                className="w-[18px] h-[18px] inline-block"
                aria-hidden="true"
              ></span>
            )}

            {/* Nút Xóa */}
            {!(
              booking.status === "ACCEPTED" && booking.paymentStatus === "PAID"
            ) ? (
              <button
                onClick={() => handleDelete(booking.id)}
                className="text-red-400 hover:text-red-300 transition duration-150"
                title="Xóa Booking"
              >
                <Trash2 size={18} />
              </button>
            ) : (
              // giữ chỗ
              <span
                className="w-[18px] h-[18px] inline-block"
                aria-hidden="true"
              ></span>
            )}
          </div>
        </td>
      </tr>
    </>
  );
};

export default BookingItem;
