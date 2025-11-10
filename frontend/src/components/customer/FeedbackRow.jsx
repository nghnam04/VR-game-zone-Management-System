import formatTime from "../utils/formatTime";

const getRatingClass = (rating) => {
  if (rating >= 4) return "text-green-400";
  if (rating >= 2) return "text-yellow-400";
  return "text-red-400";
};

const FeedbackRow = ({ feedback, onEdit }) => {
  const { id, gameName, roomName, rating, comment, feedbackDate } = feedback;

  const date = new Date(feedbackDate);

  return (
    <tr className="bg-glass-dark border-b border-glass hover:bg-glass">
      <td className="p-4 whitespace-nowrap text-gray-300 font-semibold">
        {id}
      </td>
      <td className="p-4 whitespace-nowrap">
        <div className="font-medium text-blue-500">
          {gameName || "Không có Game"}
        </div>
        <div className="text-sm text-pink-400">
          {roomName || "Không có Phòng"}
        </div>
      </td>
      <td
        className={`p-4 whitespace-nowrap font-medium text-center ${getRatingClass(
          rating
        )}`}
      >
        {rating} / 5
      </td>
      <td className="p-4 text-cyan-300">{comment || "-"}</td>
      <td className="p-4 whitespace-nowrap text-orange-400">
        {formatTime(date)}
      </td>
      <td className="p-4 text-right flex justify-end gap-2">
        <button
          onClick={() => onEdit(feedback)}
          class="border border-lime-500 bg-lime-500 text-black hover:bg-lime-600 px-3 py-1 rounded transition-colors"
        >
          Sửa
        </button>
      </td>
    </tr>
  );
};

export default FeedbackRow;
