package vn.edu.hust.vrgamesapp.service;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import vn.edu.hust.vrgamesapp.dto.PaymentDto;
import vn.edu.hust.vrgamesapp.entity.Booking;
import vn.edu.hust.vrgamesapp.entity.Payment;
import vn.edu.hust.vrgamesapp.mapper.PaymentMapper;
import vn.edu.hust.vrgamesapp.repository.BookingRepository;
import vn.edu.hust.vrgamesapp.repository.PaymentRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class PaymentService {
    private PaymentRepository paymentRepository;
    private BookingRepository bookingRepository;

    public PaymentDto createPayment(PaymentDto paymentDto) {
        if (paymentDto.getBookingId() == null) {
            throw new RuntimeException("Booking ID is required");
        }
        if (paymentDto.getPaymentMethod() == null) {
            throw new RuntimeException("Payment method is required");
        }
        if (paymentDto.getStatus() == null) {
            throw new RuntimeException("Payment status is required");
        }
        Booking booking = bookingRepository.findById(paymentDto.getBookingId())
                .orElseThrow(() -> new RuntimeException("Booking not found with id: " + paymentDto.getBookingId()));
        Payment payment = PaymentMapper.mapToPayment(paymentDto);
        payment.setBooking(booking);
        payment.setTransactionDate(LocalDateTime.now());
        payment = paymentRepository.save(payment);
        return PaymentMapper.mapToPaymentDto(payment);
    }

    public PaymentDto getPaymentById(Long id) {
        Payment payment = paymentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Payment not found with id: " + id));
        return PaymentMapper.mapToPaymentDto(payment);
    }

    public List<PaymentDto> getAllPayments() {
        return paymentRepository.findAll().stream()
                .map(payment -> PaymentMapper.mapToPaymentDto(payment))
                .collect(Collectors.toList());
    }

    public PaymentDto updatePayment(Long id, PaymentDto paymentDto) {
        Payment existing = paymentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Payment not found with id: " + id));
        if (paymentDto.getBookingId() != null) {
            Booking booking = bookingRepository.findById(paymentDto.getBookingId())
                    .orElseThrow(() -> new RuntimeException("Booking not found with id: " + paymentDto.getBookingId()));
            existing.setBooking(booking);
        }
        if (paymentDto.getAmount() != null) {
            existing.setAmount(paymentDto.getAmount());
        }
        if (paymentDto.getPaymentMethod() != null) {
            existing.setPaymentMethod(paymentDto.getPaymentMethod());
        }
        if (paymentDto.getStatus() != null) {
            existing.setStatus(paymentDto.getStatus());
        }

        existing.setTransactionDate(LocalDateTime.now());
        existing = paymentRepository.save(existing);
        return PaymentMapper.mapToPaymentDto(existing);
    }

    public void deletePayment(Long id) {
        if (!paymentRepository.existsById(id)) {
            throw new RuntimeException("Payment not found with id: " + id);
        }
        paymentRepository.deleteById(id);
    }
}