package vn.edu.hust.vrgamesapp.service;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import vn.edu.hust.vrgamesapp.dto.RoomDto;
import vn.edu.hust.vrgamesapp.entity.Room;
import vn.edu.hust.vrgamesapp.constant.RoomStatus;
import vn.edu.hust.vrgamesapp.mapper.RoomMapper;
import vn.edu.hust.vrgamesapp.repository.GameRepository;
import vn.edu.hust.vrgamesapp.repository.RoomRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class RoomService {
    private RoomRepository roomRepository;
    private GameRepository gameRepository;

    public RoomDto createRoom(RoomDto roomDto) {
        if (roomDto.getGames() != null) {
            roomDto.getGames().forEach(gameId -> gameRepository.findById(gameId)
                    .orElseThrow(() -> new RuntimeException("Game not found with id: " + gameId)));
        }
        Room room = RoomMapper.mapToRoom(roomDto);
        room = roomRepository.save(room);
        return RoomMapper.mapToRoomDto(room);
    }

    public RoomDto getRoomById(Long id) {
        Room room = roomRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Room not found with id: " + id));
        return RoomMapper.mapToRoomDto(room);
    }

    public List<RoomDto> getAllRooms(String status, Integer capacity) {
        if (status != null && !status.isEmpty()) {
            try {
                RoomStatus roomStatus = RoomStatus.valueOf(status.toUpperCase());
                return roomRepository.findByStatus(roomStatus).stream()
                        .map(room -> RoomMapper.mapToRoomDto(room))
                        .collect(Collectors.toList());
            } catch (IllegalArgumentException e) {
                throw new RuntimeException("Invalid status: " + status);
            }
        }
        if (capacity != null) {
            return roomRepository.findByCapacityGreaterThanEqual(capacity).stream()
                    .map(room -> RoomMapper.mapToRoomDto(room))
                    .collect(Collectors.toList());
        }
        return roomRepository.findAll().stream()
                .map(room -> RoomMapper.mapToRoomDto(room))
                .collect(Collectors.toList());
    }

    public RoomDto updateRoom(Long id, RoomDto roomDto) {
        Room existing = roomRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Room not found with id: " + id));
        if (roomDto.getGames() != null) {
            roomDto.getGames().forEach(gameId -> gameRepository.findById(gameId)
                    .orElseThrow(() -> new RuntimeException("Game not found with id: " + gameId)));
        }
        existing.setName(roomDto.getName());
        existing.setCapacity(roomDto.getCapacity());
        existing.setStatus(roomDto.getStatus());
        existing.setGames(RoomMapper.mapToRoom(roomDto).getGames());
        existing = roomRepository.save(existing);
        return RoomMapper.mapToRoomDto(existing);
    }

    public void deleteRoom(Long id) {
        Room room = roomRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Room not found with id: " + id));
        if (room.getStatus().equals(RoomStatus.BOOKED)) {
            throw new RuntimeException("Cannot delete booked room");
        }
        roomRepository.deleteById(id);
    }
}