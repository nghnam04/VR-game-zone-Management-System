package vn.edu.hust.vrgamesapp.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import vn.edu.hust.vrgamesapp.constant.BookingStatus;
import vn.edu.hust.vrgamesapp.constant.PaymentStatus;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "bookings")
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "game_id")
    private Game game;

    @ManyToOne
    @JoinColumn(name = "room_id")
    private Room room;

    private LocalDateTime startTime;
    private LocalDateTime endTime;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private BookingStatus status;

    private int numberOfPlayers;
    private double totalAmount;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private PaymentStatus paymentStatus;

    @OneToOne(mappedBy = "booking", cascade = CascadeType.ALL)
    private Feedback feedback;

}