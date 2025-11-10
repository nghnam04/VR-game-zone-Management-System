import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import feedBackService from "../../services/feedBackService";
import useAuth from "../../hooks/useAuth";
import LoadingSpinner from "../../components/common/LoadingSpinner";

const UserFeedbackForm = () => {
  const { feedbackId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [bookingId, setBookingId] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(!!feedbackId);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (feedbackId) {
      feedBackService
        .getFeedbackById(feedbackId)
        .then((res) => {
          const f = res.data;
          setBookingId(f.bookingId);
          setRating(f.rating);
          setComment(f.comment);
        })
        .catch((err) => console.error(err))
        .finally(() => setLoading(false));
    }
  }, [feedbackId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!bookingId || rating < 1 || rating > 5) {
      setError("Vui lòng nhập đầy đủ thông tin hợp lệ.");
      return;
    }

    setSubmitting(true);
    setError("");
    setSuccess("");

    const feedbackData = { bookingId, rating, comment };

    try {
      if (feedbackId) {
        await feedBackService.updateFeedback(feedbackId, feedbackData);
        setSuccess(
          "Cập nhật phản hồi thành công! Đang chuyển hướng về trang lịch sử phản hồi..."
        );
      } else {
        await feedBackService.createFeedback(feedbackData);
        setSuccess(
          "Tạo phản hồi thành công! Đang chuyển hướng về trang lích sử phản hồi..."
        );
      }

      setTimeout(() => navigate("/user-feedbacks"), 2000);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Lỗi khi lưu feedback");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center p-10 font-display text-vr-blue text-2xl gap-4">
        <div className="flex justify-center items-center gap-3">
          <LoadingSpinner />
          <span>Đang xử lý...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center">
      <form
        onSubmit={handleSubmit}
        className="card-base w-full max-w-lg p-6 space-y-4"
      >
        <h2 className="text-3xl font-bold text-center">
          {feedbackId ? "Cập nhật Feedback" : "Tạo Feedback mới"}
        </h2>

        {error && (
          <div className="bg-red-500/20 text-red-400 p-3 rounded-lg text-center">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-500/20 text-green-400 p-3 rounded-lg text-center">
            {success}
          </div>
        )}

        <div>
          <label className="block mb-1">Booking ID</label>
          <input
            type="number"
            value={bookingId}
            disabled={!!feedbackId}
            onChange={(e) => setBookingId(e.target.value)}
            className="input-base"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Đánh giá (1-5)</label>
          <input
            type="number"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            min="1"
            max="5"
            className="input-base"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Bình luận</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            maxLength="500"
            className="input-base"
          />
        </div>

        <button
          type="submit"
          className="btn-primary w-full text-lg"
          disabled={submitting}
        >
          {submitting
            ? "Đang lưu..."
            : feedbackId
            ? "Cập nhật phản hồi"
            : "Tạo phản hồi mới"}
        </button>
      </form>
    </div>
  );
};

export default UserFeedbackForm;
