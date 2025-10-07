package vn.edu.hust.vrgamesapp.service;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import vn.edu.hust.vrgamesapp.dto.DeviceDto;
import vn.edu.hust.vrgamesapp.entity.Device;
import vn.edu.hust.vrgamesapp.constant.DeviceStatus;
import vn.edu.hust.vrgamesapp.mapper.DeviceMapper;
import vn.edu.hust.vrgamesapp.repository.DeviceRepository;
import vn.edu.hust.vrgamesapp.repository.RoomRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class DeviceService {
    private DeviceRepository deviceRepository;
    private RoomRepository roomRepository;

    public DeviceDto createDevice(DeviceDto deviceDto) {
        roomRepository.findById(deviceDto.getRoomId())
                .orElseThrow(() -> new RuntimeException("Room not found with id: " + deviceDto.getRoomId()));
        if (deviceDto.getName() == null || deviceDto.getName().trim().isEmpty()) {
            throw new RuntimeException("Device name is required");
        }
        Device device = DeviceMapper.mapToDevice(deviceDto);
        device = deviceRepository.save(device);
        return DeviceMapper.mapToDeviceDto(device);
    }

    public DeviceDto getDeviceById(Long id) {
        Device device = deviceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Device not found with id: " + id));
        return DeviceMapper.mapToDeviceDto(device);
    }

    public List<DeviceDto> getAllDevices() {
        return deviceRepository.findAll().stream()
                .map(device -> DeviceMapper.mapToDeviceDto(device))
                .collect(Collectors.toList());
    }

    public DeviceDto updateDevice(Long id, DeviceDto deviceDto) {
        Device existing = deviceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Device not found with id: " + id));
        roomRepository.findById(deviceDto.getRoomId())
                .orElseThrow(() -> new RuntimeException("Room not found with id: " + deviceDto.getRoomId()));
        if (deviceDto.getName() == null || deviceDto.getName().trim().isEmpty()) {
            throw new RuntimeException("Device name is required");
        }
        if (existing.getStatus().equals(DeviceStatus.IN_USE)) {
            throw new RuntimeException("Cannot update device in use");
        }
        existing.setRoom(DeviceMapper.mapToDevice(deviceDto).getRoom());
        existing.setName(deviceDto.getName());
        existing.setType(deviceDto.getType());
        existing.setStatus(deviceDto.getStatus());
        existing = deviceRepository.save(existing);
        return DeviceMapper.mapToDeviceDto(existing);
    }

    public void deleteDevice(Long id) {
        Device device = deviceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Device not found with id: " + id));
        if (device.getStatus().equals(DeviceStatus.IN_USE)) {
            throw new RuntimeException("Cannot delete device in use");
        }
        deviceRepository.deleteById(id);
    }
}