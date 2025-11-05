package vn.edu.hust.vrgamesapp.controller;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import vn.edu.hust.vrgamesapp.dto.FeedbackDto;
import vn.edu.hust.vrgamesapp.service.FeedbackService;

import java.util.List;

@RestController
@RequestMapping("/api/feedbacks")
@AllArgsConstructor
public class FeedbackController {
    private FeedbackService feedbackService;

    @PostMapping
    @PreAuthorize("hasRole('CUSTOMER')")
    public ResponseEntity<FeedbackDto> createFeedback(@Valid @RequestBody FeedbackDto feedbackDto, Authentication authentication) {
        return ResponseEntity.status(HttpStatus.CREATED).body(feedbackService.createFeedback(feedbackDto, authentication.getName()));
    }

    @GetMapping("/user/me")
    @PreAuthorize("hasRole('CUSTOMER')")
    public ResponseEntity<List<FeedbackDto>> getMyFeedbacks(Authentication authentication) {
        String username = authentication.getName();
        return ResponseEntity.ok(feedbackService.getFeedbacksByUser(username));
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'STAFF', 'CUSTOMER')")
    public ResponseEntity<FeedbackDto> getFeedbackById(@PathVariable Long id) {
        return ResponseEntity.ok(feedbackService.getFeedbackById(id));
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<FeedbackDto>> getAllFeedbacks() {
        return ResponseEntity.ok(feedbackService.getAllFeedbacks());
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('CUSTOMER')")
    public ResponseEntity<FeedbackDto> updateFeedback(@PathVariable Long id, @Valid @RequestBody FeedbackDto feedbackDto, Authentication authentication) {
        return ResponseEntity.ok(feedbackService.updateFeedback(id, feedbackDto, authentication.getName()));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> deleteFeedback(@PathVariable Long id) {
        feedbackService.deleteFeedback(id);
        return ResponseEntity.ok("Feedback deleted successfully");
    }
}