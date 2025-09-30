package vn.edu.hust.vrgamesapp.mapper;

import vn.edu.hust.vrgamesapp.dto.DeviceDto;
import vn.edu.hust.vrgamesapp.entity.Device;
import vn.edu.hust.vrgamesapp.entity.Room;

public class DeviceMapper {
    public static DeviceDto mapToDeviceDto(Device device) {
        if (device == null) return null;
        DeviceDto deviceDto = new DeviceDto(
                device.getId(),
                device.getRoom() != null ? device.getRoom().getId() : null,
                device.getType(),
                device.getStatus()
        );
        return deviceDto;
    }

    public static Device mapToDevice(DeviceDto deviceDto) {
        if (deviceDto == null) return null;
        Device device = new Device();
        device.setId(deviceDto.getId());
        if (deviceDto.getRoomId() != null) {
            Room room = new Room();
            room.setId(deviceDto.getRoomId());
            device.setRoom(room);
        }
        device.setType(deviceDto.getType());
        device.setStatus(deviceDto.getStatus());
        return device;
    }
}
