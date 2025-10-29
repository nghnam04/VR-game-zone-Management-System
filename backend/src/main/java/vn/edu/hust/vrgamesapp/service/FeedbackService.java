package vn.edu.hust.vrgamesapp.service;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import vn.edu.hust.vrgamesapp.constant.PaymentStatus;
import vn.edu.hust.vrgamesapp.dto.FeedbackDto;
import vn.edu.hust.vrgamesapp.entity.Booking;
import vn.edu.hust.vrgamesapp.entity.Feedback;
import vn.edu.hust.vrgamesapp.constant.BookingStatus;
import vn.edu.hust.vrgamesapp.entity.User;
import vn.edu.hust.vrgamesapp.mapper.FeedbackMapper;
import vn.edu.hust.vrgamesapp.repository.BookingRepository;
import vn.edu.hust.vrgamesapp.repository.FeedbackRepository;
import vn.edu.hust.vrgamesapp.repository.UserRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class FeedbackService {
    private FeedbackRepository feedbackRepository;
    private BookingRepository bookingRepository;
    private UserRepository userRepository;

    @Transactional
    public FeedbackDto createFeedback(FeedbackDto feedbackDto, String username) {
        Booking booking = bookingRepository.findById(feedbackDto.getBookingId())
                .orElseThrow(() -> new RuntimeException("Booking not found with id: " + feedbackDto.getBookingId()));
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found with username: " + username));
        if (!booking.getUser().getUsername().equals(username)) {
            throw new RuntimeException("Only the booking owner can leave feedback");
        }
        if (booking.getStatus() != BookingStatus.ACCEPTED || booking.getPaymentStatus() != PaymentStatus.PAID) {
            throw new RuntimeException("Booking must be accepted and paid to leave feedback");
        }
        if (feedbackDto.getRating() < 1 || feedbackDto.getRating() > 5) {
            throw new RuntimeException("Rating must be between 1 and 5");
        }
        if (feedbackRepository.existsByBookingId(feedbackDto.getBookingId())) {
            throw new RuntimeException("Feedback already exists for this booking");
        }
        Feedback feedback = FeedbackMapper.mapToFeedback(feedbackDto);
        feedback.setUser(user);
        feedback.setBooking(booking);
        feedback.setFeedbackDate(LocalDateTime.now());
        feedback = feedbackRepository.save(feedback);
        return FeedbackMapper.mapToFeedbackDto(feedback);
    }

    public FeedbackDto getFeedbackById(Long id) {
        Feedback feedback = feedbackRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Feedback not found with id: " + id));
        return FeedbackMapper.mapToFeedbackDto(feedback);
    }

    public List<FeedbackDto> getAllFeedbacks() {
        return feedbackRepository.findAll().stream()
                .map(feedback -> FeedbackMapper.mapToFeedbackDto(feedback))
                .collect(Collectors.toList());
    }

    @Transactional
    public FeedbackDto updateFeedback(Long id, FeedbackDto feedbackDto, String username) {
        Feedback existing = feedbackRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Feedback not found with id: " + id));
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found with username: " + username));
        if (!existing.getUser().getUsername().equals(username)) {
            throw new RuntimeException("Only the feedback owner can update");
        }
        if (feedbackDto.getRating() < 1 || feedbackDto.getRating() > 5) {
            throw new RuntimeException("Rating must be between 1 and 5");
        }
        existing.setRating(feedbackDto.getRating());
        existing.setComment(feedbackDto.getComment());
        existing.setFeedbackDate(LocalDateTime.now());
        existing = feedbackRepository.save(existing);
        return FeedbackMapper.mapToFeedbackDto(existing);
    }

    @Transactional
    public void deleteFeedback(Long id) {
        Feedback feedback = feedbackRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Feedback not found with id: " + id));

        if (feedback.getBooking() != null) {
            feedback.getBooking().setFeedback(null);
        }
        feedbackRepository.delete(feedback);
    }
}