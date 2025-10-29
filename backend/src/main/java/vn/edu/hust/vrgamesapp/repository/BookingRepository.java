package vn.edu.hust.vrgamesapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import vn.edu.hust.vrgamesapp.constant.BookingStatus;
import vn.edu.hust.vrgamesapp.constant.PaymentStatus;
import vn.edu.hust.vrgamesapp.entity.Booking;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {
    boolean existsByGameId(Long id);
    boolean existsByRoomIdAndStatusIn(Long id, List<BookingStatus> statuses);

    @Query("SELECT b FROM Booking b WHERE b.room.id = :roomId AND b.startTime BETWEEN :start AND :end")
    List<Booking> findByRoomIdAndStartTimeBetween(Long roomId, LocalDateTime start, LocalDateTime end);

    @Query("SELECT b FROM Booking b JOIN b.user u WHERE u.username = :username")
    List<Booking> findByUsername(String username);

    @Query("SELECT b FROM Booking b WHERE b.status = :status AND b.paymentStatus = :paymentStatus AND b.startTime < :cutoff")
    List<Booking> findByStatusAndPaymentStatusAndStartTimeBefore(BookingStatus status, PaymentStatus paymentStatus, LocalDateTime cutoff);

    List<Booking> findByStatus(BookingStatus bookingStatus);

    List<Booking> findByRoomId(Long roomId);
}