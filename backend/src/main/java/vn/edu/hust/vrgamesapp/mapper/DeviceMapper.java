package vn.edu.hust.vrgamesapp.mapper;

import vn.edu.hust.vrgamesapp.dto.DeviceDto;
import vn.edu.hust.vrgamesapp.entity.Device;
import vn.edu.hust.vrgamesapp.entity.Room;

public class DeviceMapper {
    public static DeviceDto mapToDeviceDto(Device device) {
        if (device == null) return null;
        return new DeviceDto(
                device.getId(),
                device.getRoom() != null ? device.getRoom().getId() : null,
                device.getRoom() != null ? device.getRoom().getName() : null,
                device.getName(),
                device.getType(),
                device.getStatus(),
                device.getQuantity(),
                device.getImageUrl()
        );
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
        device.setName(deviceDto.getName());
        device.setType(deviceDto.getType());
        if (deviceDto.getStatus() != null) {
            device.setStatus(deviceDto.getStatus());
        }
        device.setQuantity(deviceDto.getQuantity());
        device.setImageUrl(deviceDto.getImageUrl());
        return device;
    }
}
