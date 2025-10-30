package vn.edu.hust.vrgamesapp.dto;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import vn.edu.hust.vrgamesapp.constant.GameGenre;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class GameDto {
    private Long id;

    @NotBlank(message = "Game name is required")
    @Size(max = 100, message = "Game name cannot exceed 100 characters")
    private String name;

    @NotNull(message = "Game genre is required")
    private GameGenre genre;

    @Size(max = 1000, message = "Description cannot exceed 1000 characters")
    private String description;

    @Min(value = 1, message = "Duration must be at least 1 minute")
    @Max(value = 120, message = "Duration cannot exceed 120 minutes")
    private int duration;

    @DecimalMin(value = "0.0", message = "Price cannot be negative")
    private double price;
    private List<Long> rooms;

    @Min(value = 1, message = "Max players must be at least 1")
    @Max(value = 10, message = "Max players cannot exceed 10")
    private int maxPlayers;
}