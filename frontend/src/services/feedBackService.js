import axiosInstance from "../api/axios";

const feedBackService = {
  getAllFeedbacks: () => axiosInstance.get("/feedbacks"),

  getFeedbackById: (id) => axiosInstance.get(`/feedbacks/${id}`),

  getMyFeedbacks: () => axiosInstance.get("/feedbacks/user/me"),

  createFeedback: (feedbackData) =>
    axiosInstance.post("/feedbacks", feedbackData),

  updateFeedback: (id, feedbackData) =>
    axiosInstance.put(`/feedbacks/${id}`, feedbackData),

  deleteFeedback: (id) => axiosInstance.delete(`/feedbacks/${id}`),
};

export default feedBackService;
