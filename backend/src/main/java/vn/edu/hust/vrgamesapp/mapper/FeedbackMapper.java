package vn.edu.hust.vrgamesapp.mapper;

import vn.edu.hust.vrgamesapp.dto.FeedbackDto;
import vn.edu.hust.vrgamesapp.entity.Booking;
import vn.edu.hust.vrgamesapp.entity.Feedback;
import vn.edu.hust.vrgamesapp.entity.User;

public class FeedbackMapper {
    public static FeedbackDto mapToFeedbackDto(Feedback feedback) {
        if (feedback == null) return null;

        FeedbackDto feedbackDto = new FeedbackDto();
        feedbackDto.setId(feedback.getId());
        feedbackDto.setBookingId(feedback.getBooking() != null ? feedback.getBooking().getId() : null);
        feedbackDto.setUserId(feedback.getUser() != null ? feedback.getUser().getId() : null);
        feedbackDto.setUserName(feedback.getUser() != null ? feedback.getUser().getName() : null);
        feedbackDto.setRating(feedback.getRating());
        feedbackDto.setComment(feedback.getComment());
        feedbackDto.setFeedbackDate(feedback.getFeedbackDate());

        if (feedback.getBooking() != null) {
            if (feedback.getBooking().getGame() != null) {
                feedbackDto.setGameName(feedback.getBooking().getGame().getName());
            }
            if (feedback.getBooking().getRoom() != null) {
                feedbackDto.setRoomName(feedback.getBooking().getRoom().getName());
            }
        }
        return feedbackDto;
    }

    public static Feedback mapToFeedback(FeedbackDto feedbackDto) {
        if (feedbackDto == null) return null;
        Feedback feedback = new Feedback();
        feedback.setId(feedbackDto.getId());
        if (feedbackDto.getBookingId() != null) {
            Booking booking = new Booking();
            booking.setId(feedbackDto.getBookingId());
            feedback.setBooking(booking);
        }
        if (feedbackDto.getUserId() != null) {
            User user = new User();
            user.setId(feedbackDto.getUserId());
            feedback.setUser(user);
        }
        feedback.setRating(feedbackDto.getRating());
        feedback.setComment(feedbackDto.getComment());
        feedback.setFeedbackDate(feedbackDto.getFeedbackDate());
        return feedback;
    }
}