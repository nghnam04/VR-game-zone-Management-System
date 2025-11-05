package vn.edu.hust.vrgamesapp.dto;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import vn.edu.hust.vrgamesapp.constant.DeviceStatus;
import vn.edu.hust.vrgamesapp.constant.DeviceType;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class DeviceDto {
    private Long id;

    @NotNull(message = "Room ID is required")
    @Positive(message = "Room ID must be a positive number")
    private Long roomId;

    private String roomName;

    @NotBlank(message = "Device name is required")
    @Size(max = 100, message = "Device name cannot exceed 100 characters")
    private String name;
    private DeviceType type;
    private DeviceStatus status;

    @Min(value = 1, message = "Quantity must be at least 1")
    @Max(value = 20, message = "Quantity cannot exceed 20")
    private int quantity;
}