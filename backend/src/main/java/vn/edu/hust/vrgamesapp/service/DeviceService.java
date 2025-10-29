package vn.edu.hust.vrgamesapp.service;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import vn.edu.hust.vrgamesapp.constant.BookingStatus;
import vn.edu.hust.vrgamesapp.constant.DeviceStatus;
import vn.edu.hust.vrgamesapp.dto.DeviceDto;
import vn.edu.hust.vrgamesapp.entity.Device;
import vn.edu.hust.vrgamesapp.entity.Room;
import vn.edu.hust.vrgamesapp.mapper.DeviceMapper;
import vn.edu.hust.vrgamesapp.repository.BookingRepository;
import vn.edu.hust.vrgamesapp.repository.DeviceRepository;
import vn.edu.hust.vrgamesapp.repository.RoomRepository;

import java.util.List;

@Service
@AllArgsConstructor
public class DeviceService {
    private final DeviceRepository deviceRepository;
    private final RoomRepository roomRepository;
    private final BookingRepository bookingRepository;

    @Transactional
    public DeviceDto createDevice(DeviceDto dto) {
        if (dto.getName() == null || dto.getName().trim().isEmpty()) {
            throw new RuntimeException("Device name is required");
        }

        Room room = null;
        if (dto.getRoomId() != null) {
            room = roomRepository.findById(dto.getRoomId())
                    .orElseThrow(() -> new RuntimeException("Room not found with id: " + dto.getRoomId()));
            if (deviceRepository.existsByRoomIdAndNameAndType(room.getId(), dto.getName(), dto.getType())) {
                throw new RuntimeException("Device has existed in this room");
            }
        }

        Device device = DeviceMapper.mapToDevice(dto);
        device.setStatus(DeviceStatus.AVAILABLE);
        device.setRoom(room);

        device = deviceRepository.save(device);
        return DeviceMapper.mapToDeviceDto(device);
    }

    public DeviceDto getDeviceById(Long id) {
        Device device = deviceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Device not found with id: " + id));
        return DeviceMapper.mapToDeviceDto(device);
    }

    public List<DeviceDto> getAllDevices() {
        return deviceRepository.findAll().stream().map(DeviceMapper::mapToDeviceDto).toList();
    }

    @Transactional
    public DeviceDto updateDevice(Long id, DeviceDto dto) {
        Device existing = deviceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Device not found with id: " + id));

        if (dto.getName() == null || dto.getName().trim().isEmpty()) {
            throw new RuntimeException("Device name is required");
        }

        if (existing.getStatus() == DeviceStatus.IN_USE || existing.getStatus() == DeviceStatus.MAINTENANCE) {
            throw new RuntimeException("IN_USE or MAINTENANCE Device cannot be updated");
        }

        // If move to other rooms, check if rooms exist or not
        Room newRoom = null;
        if (dto.getRoomId() != null) {
            newRoom = roomRepository.findById(dto.getRoomId())
                    .orElseThrow(() -> new RuntimeException("Room not found with id: " + dto.getRoomId()));
        }
        existing.setName(dto.getName());
        existing.setType(dto.getType());
        existing.setQuantity(dto.getQuantity());
        existing.setRoom(newRoom);

        if (dto.getStatus() != null) {
            existing.setStatus(dto.getStatus());
        }

        existing = deviceRepository.save(existing);
        return DeviceMapper.mapToDeviceDto(existing);
    }

    @Transactional
    public void deleteDevice(Long id) {
        Device device = deviceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Device not found with id: " + id));

        if (device.getStatus() == DeviceStatus.IN_USE) {
            throw new RuntimeException("IN_USE Device cannot be deleted");
        }

        // Cannot delete device in a room which is in booking process
        if (device.getRoom() != null) {
            boolean hasActive = bookingRepository.existsByRoomIdAndStatusIn(
                    device.getRoom().getId(),
                    List.of(BookingStatus.PENDING, BookingStatus.ACCEPTED, BookingStatus.CANCELLED)
            );
            if (hasActive) {
                throw new RuntimeException("Cannot delete device when room containing device has active booking");
            }
        }

        deviceRepository.delete(device);
    }
}
