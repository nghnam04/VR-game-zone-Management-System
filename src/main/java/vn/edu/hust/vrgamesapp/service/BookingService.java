package vn.edu.hust.vrgamesapp.service;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import vn.edu.hust.vrgamesapp.dto.BookingDto;
import vn.edu.hust.vrgamesapp.entity.Booking;
import vn.edu.hust.vrgamesapp.constant.BookingStatus;
import vn.edu.hust.vrgamesapp.entity.Room;
import vn.edu.hust.vrgamesapp.mapper.BookingMapper;
import vn.edu.hust.vrgamesapp.repository.BookingRepository;
import vn.edu.hust.vrgamesapp.repository.GameRepository;
import vn.edu.hust.vrgamesapp.repository.RoomRepository;
import vn.edu.hust.vrgamesapp.repository.UserRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class BookingService {
    private BookingRepository bookingRepository;
    private UserRepository userRepository;
    private GameRepository gameRepository;
    private RoomRepository roomRepository;

    public BookingDto createBooking(BookingDto bookingDto) {
        userRepository.findById(bookingDto.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found with id: " + bookingDto.getUserId()));
        gameRepository.findById(bookingDto.getGameId())
                .orElseThrow(() -> new RuntimeException("Game not found with id: " + bookingDto.getGameId()));
        Room room = roomRepository.findById(bookingDto.getRoomId())
                .orElseThrow(() -> new RuntimeException("Room not found with id: " + bookingDto.getRoomId()));

        // Kiểm tra game user chọn có nằm trong danh sách game phòng đó hay không
        if (!room.getGames().stream().anyMatch(g -> g.getId().equals(bookingDto.getGameId()))) {
            throw new RuntimeException("Game not supported in this room");
        }
        Booking booking = BookingMapper.mapToBooking(bookingDto);
        booking.setStatus(BookingStatus.PENDING);
        booking = bookingRepository.save(booking);
        return BookingMapper.mapToBookingDto(booking);
    }

    public BookingDto getBookingById(Long id) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found with id: " + id));
        return BookingMapper.mapToBookingDto(booking);
    }

    public List<BookingDto> getAllBookings() {
        return bookingRepository.findAll().stream()
                .map(booking -> BookingMapper.mapToBookingDto(booking))
                .collect(Collectors.toList());
    }

    public BookingDto updateBooking(Long id, BookingDto bookingDto) {
        Booking existing = bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found with id: " + id));
        userRepository.findById(bookingDto.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));
        gameRepository.findById(bookingDto.getGameId())
                .orElseThrow(() -> new RuntimeException("Game not found"));
        Room room = roomRepository.findById(bookingDto.getRoomId())
                .orElseThrow(() -> new RuntimeException("Room not found"));
        if (!room.getGames().stream().anyMatch(g -> g.getId().equals(bookingDto.getGameId()))) {
            throw new RuntimeException("Game not supported in this room");
        }
        existing.setUser(BookingMapper.mapToBooking(bookingDto).getUser());
        existing.setGame(BookingMapper.mapToBooking(bookingDto).getGame());
        existing.setRoom(BookingMapper.mapToBooking(bookingDto).getRoom());
        existing.setStartTime(bookingDto.getStartTime());
        existing.setEndTime(bookingDto.getEndTime());
        existing.setStatus(bookingDto.getStatus());
        existing = bookingRepository.save(existing);
        return BookingMapper.mapToBookingDto(existing);
    }

    public void cancelBooking(Long id) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found with id: " + id));
        if (booking.getStatus() == BookingStatus.CONFIRMED) {
            throw new RuntimeException("Cannot cancel confirmed booking");
        }
        booking.setStatus(BookingStatus.CANCELLED);
        bookingRepository.save(booking);
    }
}