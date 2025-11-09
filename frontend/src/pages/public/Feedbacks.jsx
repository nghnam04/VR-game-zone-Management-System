import React from "react";
import useFetch from "../../hooks/useFetch";
import feedbackService from "../../services/feedBackService";
import FeedbackCard from "../../components/cards/FeedbackCard";
import { motion } from "framer-motion";
import LoadingSpinner from "../../components/common/LoadingSpinner";

const Feedbacks = () => {
  const {
    data: feedbacks,
    loading,
    error,
  } = useFetch(feedbackService.getAllFeedbacks);

  if (loading) {
    return (
      <div className="flex flex-col items-center p-10 font-display text-vr-blue text-2xl gap-4">
        <div className="flex justify-center items-center gap-3">
          <LoadingSpinner />
          <span>Đang tải phản hồi khách hàng...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center p-10 text-red-400">Lỗi: {error}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-8"
    >
      <h2 className="text-5xl font-display font-bold text-white border-b border-vr-blue/50 pb-4">
        Phản Hồi Khách Hàng
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {feedbacks && feedbacks.map((feedback) => <FeedbackCard key={feedback.id} feedback={feedback} />)}
      </div>
    </motion.div>
  );
};

export default Feedbacks;
