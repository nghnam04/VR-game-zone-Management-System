package vn.edu.hust.vrgamesapp.controller;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import vn.edu.hust.vrgamesapp.dto.BookingDto;
import vn.edu.hust.vrgamesapp.service.BookingService;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
@AllArgsConstructor
public class BookingController {
    private BookingService bookingService;

    @PostMapping
    @PreAuthorize("hasRole('CUSTOMER')")
    public ResponseEntity<BookingDto> createBooking(@Valid @RequestBody BookingDto bookingDto, Authentication authentication) {
        return ResponseEntity.status(HttpStatus.CREATED).body(bookingService.createBooking(bookingDto, authentication.getName()));
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'STAFF', 'CUSTOMER')")
    public ResponseEntity<BookingDto> getBookingById(@PathVariable Long id) {
        return ResponseEntity.ok(bookingService.getBookingById(id));
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<BookingDto>> getAllBookings() {
        return ResponseEntity.ok(bookingService.getAllBookings());
    }

    @GetMapping("/user/me")
    @PreAuthorize("hasRole('CUSTOMER')")
    public ResponseEntity<List<BookingDto>> getUserBookings(Authentication authentication) {
        return ResponseEntity.ok(bookingService.getUserBookings(authentication.getName()));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('CUSTOMER')")
    public ResponseEntity<BookingDto> updateBooking(@PathVariable Long id, @Valid @RequestBody BookingDto bookingDto, Authentication authentication) {
        return ResponseEntity.ok(bookingService.updateBooking(id, bookingDto, authentication.getName()));
    }

    @PatchMapping("/{id}/cancel")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<BookingDto> cancelBooking(@PathVariable Long id) {
        return ResponseEntity.ok(bookingService.cancelBooking(id));
    }

    @PatchMapping("/{id}/accept")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<BookingDto> acceptBooking(@PathVariable Long id) {
        return ResponseEntity.ok(bookingService.acceptBooking(id));
    }

    @PatchMapping("/{id}/pay")
    @PreAuthorize("hasRole('STAFF') or hasRole('ADMIN')")
    public ResponseEntity<BookingDto> confirmPayment(@PathVariable Long id) {
        return ResponseEntity.ok(bookingService.confirmPayment(id));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> deleteBooking(@PathVariable Long id) {
        bookingService.deleteBooking(id);
        return ResponseEntity.ok("Booking deleted successfully");
    }
}