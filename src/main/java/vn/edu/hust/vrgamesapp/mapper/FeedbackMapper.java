package vn.edu.hust.vrgamesapp.mapper;

import vn.edu.hust.vrgamesapp.dto.FeedbackDto;
import vn.edu.hust.vrgamesapp.entity.Booking;
import vn.edu.hust.vrgamesapp.entity.Feedback;

public class FeedbackMapper {
    public static FeedbackDto mapToFeedbackDto(Feedback feedback) {
        if (feedback == null) return null;
        FeedbackDto feedbackDto = new FeedbackDto(
                feedback.getId(),
                feedback.getBooking() != null ? feedback.getBooking().getId() : null,
                feedback.getRating(),
                feedback.getComment()
        );
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
        feedback.setRating(feedbackDto.getRating());
        feedback.setComment(feedbackDto.getComment());
        return feedback;
    }
}