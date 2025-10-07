package vn.edu.hust.vrgamesapp.service;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import vn.edu.hust.vrgamesapp.dto.FeedbackDto;
import vn.edu.hust.vrgamesapp.entity.Feedback;
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

    public FeedbackDto createFeedback(FeedbackDto feedbackDto) {
        bookingRepository.findById(feedbackDto.getBookingId())
                .orElseThrow(() -> new RuntimeException("Booking not found with id: " + feedbackDto.getBookingId()));
        userRepository.findById(feedbackDto.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found with id: " + feedbackDto.getUserId()));
        if (feedbackDto.getRating() < 1 || feedbackDto.getRating() > 5) {
            throw new RuntimeException("Rating must be between 1 and 5");
        }
        Feedback feedback = FeedbackMapper.mapToFeedback(feedbackDto);
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
                .map(feedBack -> FeedbackMapper.mapToFeedbackDto(feedBack))
                .collect(Collectors.toList());
    }

    public FeedbackDto updateFeedback(Long id, FeedbackDto feedbackDto) {
        Feedback existing = feedbackRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Feedback not found with id: " + id));
        bookingRepository.findById(feedbackDto.getBookingId())
                .orElseThrow(() -> new RuntimeException("Booking not found"));
        userRepository.findById(feedbackDto.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));
        if (feedbackDto.getRating() < 1 || feedbackDto.getRating() > 5) {
            throw new RuntimeException("Rating must be between 1 and 5");
        }
        existing.setBooking(FeedbackMapper.mapToFeedback(feedbackDto).getBooking());
        existing.setUser(FeedbackMapper.mapToFeedback(feedbackDto).getUser());
        existing.setRating(feedbackDto.getRating());
        existing.setComment(feedbackDto.getComment());
        existing.setFeedbackDate(LocalDateTime.now());
        existing = feedbackRepository.save(existing);
        return FeedbackMapper.mapToFeedbackDto(existing);
    }

    public void deleteFeedback(Long id) {
        if (!feedbackRepository.existsById(id)) {
            throw new RuntimeException("Feedback not found with id: " + id);
        }
        feedbackRepository.deleteById(id);
    }
}