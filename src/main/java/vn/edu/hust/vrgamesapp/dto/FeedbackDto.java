package vn.edu.hust.vrgamesapp.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class FeedbackDto {
    private Long id;
    private Long bookingId;
    private int rating;
    private String comment;
}
