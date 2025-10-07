package vn.edu.hust.vrgamesapp.mapper;

import vn.edu.hust.vrgamesapp.dto.PaymentDto;
import vn.edu.hust.vrgamesapp.entity.Payment;
import vn.edu.hust.vrgamesapp.entity.Booking;

public class PaymentMapper {
    public static PaymentDto mapToPaymentDto(Payment payment) {
        if (payment == null) return null;
        return new PaymentDto(
                payment.getId(),
                payment.getBooking() != null ? payment.getBooking().getId() : null,
                payment.getAmount(),
                payment.getPaymentMethod(),
                payment.getStatus(),
                payment.getTransactionDate()
        );
    }

    public static Payment mapToPayment(PaymentDto paymentDto) {
        if (paymentDto == null) return null;
        Payment payment = new Payment();
        payment.setId(paymentDto.getId());
        if (paymentDto.getBookingId() != null) {
            Booking booking = new Booking();
            booking.setId(paymentDto.getBookingId());
            payment.setBooking(booking);
        }
        payment.setAmount(paymentDto.getAmount());
        payment.setPaymentMethod(paymentDto.getPaymentMethod());
        payment.setStatus(paymentDto.getStatus());
        payment.setTransactionDate(paymentDto.getTransactionDate());
        return payment;
    }
}