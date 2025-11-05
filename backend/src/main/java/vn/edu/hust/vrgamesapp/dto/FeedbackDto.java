package vn.edu.hust.vrgamesapp.dto;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class FeedbackDto {
    private Long id;

    @NotNull(message = "Booking ID is required")
    @Positive(message = "Booking ID must be a positive number")
    private Long bookingId;

    @Positive(message = "User ID must be a positive number")
    private Long userId;

    private String userName;

    @Min(value = 1, message = "Rating must be at least 1")
    @Max(value = 5, message = "Rating cannot exceed 5")
    private int rating;

    @Size(max = 500, message = "Comment cannot exceed 500 characters")
    private String comment;

    @PastOrPresent(message = "Feedback date must be in the past or present")
    private LocalDateTime feedbackDate;

    private String gameName;
    private String roomName;
}