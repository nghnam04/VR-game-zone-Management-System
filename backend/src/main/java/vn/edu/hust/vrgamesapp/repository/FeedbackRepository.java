package vn.edu.hust.vrgamesapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import vn.edu.hust.vrgamesapp.entity.Feedback;

public interface FeedbackRepository extends JpaRepository<Feedback, Long> {
    boolean existsByBookingId(Long bookingId);
}