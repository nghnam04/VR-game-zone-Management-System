// UserFeedbacks.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import feedBackService from "../../services/feedBackService";
import { motion } from "framer-motion";
import { PlusCircle } from "lucide-react";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import FeedbackRow from "../../components/customer/FeedbackRow";

const UserFeedbacks = () => {
  const navigate = useNavigate();
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchFeedbacks = async () => {
    setLoading(true);
    try {
      const res = await feedBackService.getMyFeedbacks();
      const data = res.data.map((f) => ({
        ...f,
        gameName: f.gameName || "Không có Game",
        roomName: f.roomName || "Không có Phòng",
      }));
      setFeedbacks(data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Không thể tải lịch sử feedback");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const handleEdit = (feedback) => {
    navigate(`/user-feedbacks/edit/${feedback.id}`);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center p-10 font-display text-vr-blue text-2xl gap-4">
        <div className="flex justify-center items-center gap-3">
          <LoadingSpinner />
          <span>Đang tải lịch sử phản hồi...</span>
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
          Lịch Sử Phản Hồi
        </h2>
        <button
          onClick={() => navigate("/user-feedbacks/new")}
          className="px-6 py-3 bg-cyan-500 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-600 transition duration-200 flex items-center space-x-2"
        >
          <PlusCircle size={18} className="mr-2" />
          <span>Tạo Feedback mới</span>
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
              <th className="p-4 text-center text-xs font-medium text-gray-400 uppercase">
                Đánh giá
              </th>
              <th className="p-4 text-left text-xs font-medium text-gray-400 uppercase">
                Bình luận
              </th>
              <th className="p-4 text-left text-xs font-medium text-gray-400 uppercase">
                Ngày gửi
              </th>
              <th className="p-4 text-right text-xs font-medium text-gray-400 uppercase">
                Hành động
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-glass">
            {feedbacks.length > 0 ? (
              feedbacks.map((f) => (
                <FeedbackRow key={f.id} feedback={f} onEdit={handleEdit} />
              ))
            ) : (
              <tr>
                <td colSpan="7" className="p-6 text-center text-gray-500">
                  Bạn chưa gửi phản hồi nào.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default UserFeedbacks;
