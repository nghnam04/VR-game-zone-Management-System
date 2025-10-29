package vn.edu.hust.vrgamesapp.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import vn.edu.hust.vrgamesapp.dto.RoomDto;
import vn.edu.hust.vrgamesapp.service.RoomService;

import java.util.List;

@RestController
@RequestMapping("/api/rooms")
@AllArgsConstructor
public class RoomController {
    private RoomService roomService;

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<RoomDto> createRoom(@RequestBody RoomDto roomDto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(roomService.createRoom(roomDto));
    }

    @GetMapping("/{id}")
    public ResponseEntity<RoomDto> getRoomById(@PathVariable Long id) {
        return ResponseEntity.ok(roomService.getRoomById(id));
    }

    @GetMapping
    public ResponseEntity<List<RoomDto>> getAllRooms(
            @RequestParam(required = false) String status,
            @RequestParam(required = false) Integer capacity) {
        return ResponseEntity.ok(roomService.getAllRooms(status, capacity));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<RoomDto> updateRoom(@PathVariable Long id, @RequestBody RoomDto roomDto) {
        return ResponseEntity.ok(roomService.updateRoom(id, roomDto));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> deleteRoom(@PathVariable Long id) {
        roomService.deleteRoom(id);
        return ResponseEntity.ok("Room deleted successfully");
    }
}