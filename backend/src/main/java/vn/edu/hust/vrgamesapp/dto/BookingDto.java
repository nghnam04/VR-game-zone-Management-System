package vn.edu.hust.vrgamesapp.dto;

import jakarta.validation.constraints.*;
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
public class BookingDto {
    private Long id;

    @Positive(message = "User ID must be a positive number")
    private Long userId;

    private String userName;

    @NotNull(message = "Game ID is required")
    @Positive(message = "Game ID must be a positive number")
    private Long gameId;

    private String gameName;

    @NotNull(message = "Room ID is required")
    @Positive(message = "Room ID must be a positive number")
    private Long roomId;

    private String roomName;

    private int gameDuration;

    @NotNull(message = "Start time is required")
    @FutureOrPresent(message = "Start time must be in the present or future")
    private LocalDateTime startTime;
    private BookingStatus status;

    @Min(value = 1, message = "Number of players must be at least 1")
    @Max(value = 10, message = "Number of players cannot exceed 10")
    private int numberOfPlayers;

    @DecimalMin(value = "0.0", message = "Total amount cannot be negative")
    private double totalAmount;
    private PaymentStatus paymentStatus;
}