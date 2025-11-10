import formatTimeV2 from "../utils/formatTimev2";
import formatCurrency from "../utils/formatCurrency";

const getStatusClass = (status) => {
  switch (status) {
    case "PENDING":
      return "text-yellow-400";
    case "ACCEPTED":
      return "text-green-400";
    case "CANCELLED":
      return "text-red-400";
    default:
      return "text-gray-400";
  }
};

const getPaymentStatusClass = (status) => {
  switch (status) {
    case "PAID":
      return "text-blue-400";
    case "UNPAID":
      return "text-yellow-400";
    default:
      return "text-gray-400";
  }
};

const BookingRow = ({ booking, onEdit, onCancel, onDelete }) => {
  const {
    id,
    gameName,
    roomName,
    startTime,
    gameDuration,
    status,
    numberOfPlayers,
    totalAmount,
    paymentStatus,
  } = booking;

  const start = new Date(startTime);
  const end = new Date(startTime);
  end.setMinutes(end.getMinutes() + (gameDuration || 60));

  return (
    <tr className="bg-glass-dark border-b border-glass hover:bg-glass">
      <td className="p-4 whitespace-nowrap text-gray-300">{id}</td>
      <td className="p-4 whitespace-nowrap">
        <div className="font-medium text-blue-400">
          {gameName || "Không có Game"}
        </div>
        <div className="text-sm text-pink-400">
          {roomName || "Không có Phòng"}
        </div>
      </td>
      <td className="p-4 whitespace-nowrap text-orange-400">
        <div>{start.toLocaleDateString("vi-VN")}</div>
        <div className="text-sm font-medium text-yellow-200">
          {formatTimeV2(start)} - {formatTimeV2(end)}
        </div>
      </td>
      <td className="p-4 whitespace-nowrap text-center text-gray-300">
        {numberOfPlayers}
      </td>
      <td className="p-4 whitespace-nowrap font-semibold text-cyan-500">
        {formatCurrency(totalAmount)}
      </td>
      <td
        className={`p-4 whitespace-nowrap font-medium text-center ${getStatusClass(
          status
        )}`}
      >
        {status}
      </td>
      <td
        className={`p-4 whitespace-nowrap font-medium text-center ${getPaymentStatusClass(
          paymentStatus
        )}`}
      >
        {paymentStatus}
      </td>
      <td className="p-4 whitespace-nowrap text-right flex justify-end gap-2">
        {status === "PENDING" && paymentStatus === "UNPAID" && (
          <button
            onClick={() => onEdit(booking)}
            class="border border-lime-500 bg-lime-500 text-black hover:bg-lime-600 px-3 py-1 rounded transition-colors"
          >
            Sửa
          </button>
        )}
        {!(
          status === "CANCELLED" ||
          (status === "ACCEPTED" && paymentStatus === "PAID")
        ) && (
          <button
            onClick={() => onCancel(id)}
            class="border border-cyan-500 bg-cyan-500 text-black hover:bg-cyan-600 px-3 py-1 rounded transition-colors"
          >
            Hủy
          </button>
        )}
        {status === "CANCELLED" && (
          <button
            onClick={() => onDelete(id)}
            class="border border-red-500 bg-red-500 text-black hover:bg-red-600 px-3 py-1 rounded transition-colors"
          >
            Xóa
          </button>
        )}
      </td>
    </tr>
  );
};

export default BookingRow;
