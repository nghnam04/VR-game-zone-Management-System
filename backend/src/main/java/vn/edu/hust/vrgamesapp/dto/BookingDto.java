package vn.edu.hust.vrgamesapp.dto;

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
    private Long userId;
    private Long gameId;
    private Long roomId;
    private LocalDateTime startTime;
    private BookingStatus status;
    private int numberOfPlayers;
    private double totalAmount;
    private PaymentStatus paymentStatus;
}