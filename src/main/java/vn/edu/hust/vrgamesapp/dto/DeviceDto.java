package vn.edu.hust.vrgamesapp.dto;

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
    private Long roomId;
    private DeviceType type;
    private DeviceStatus status;
}
