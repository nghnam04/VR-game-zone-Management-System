package vn.edu.hust.vrgamesapp.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import vn.edu.hust.vrgamesapp.constant.PaymentMethodEnum;
import vn.edu.hust.vrgamesapp.constant.PaymentStatusEnum;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PaymentDto {
    private Long id;
    private Long bookingId;
    private String amount;
    private PaymentMethodEnum paymentMethod;
    private PaymentStatusEnum status;
    private LocalDateTime transactionDate;

}