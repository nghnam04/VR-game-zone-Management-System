package vn.edu.hust.vrgamesapp.service;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import vn.edu.hust.vrgamesapp.constant.DeviceStatus;
import vn.edu.hust.vrgamesapp.constant.RoomStatus;
import vn.edu.hust.vrgamesapp.dto.BookingDto;
import vn.edu.hust.vrgamesapp.entity.Booking;
import vn.edu.hust.vrgamesapp.constant.BookingStatus;
import vn.edu.hust.vrgamesapp.constant.PaymentStatus;
import vn.edu.hust.vrgamesapp.entity.Game;
import vn.edu.hust.vrgamesapp.entity.Room;
import vn.edu.hust.vrgamesapp.entity.User;
import vn.edu.hust.vrgamesapp.mapper.BookingMapper;
import vn.edu.hust.vrgamesapp.repository.BookingRepository;
import vn.edu.hust.vrgamesapp.repository.DeviceRepository;
import vn.edu.hust.vrgamesapp.repository.GameRepository;
import vn.edu.hust.vrgamesapp.repository.RoomRepository;
import vn.edu.hust.vrgamesapp.repository.UserRepository;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class BookingService {
    private BookingRepository bookingRepository;
    private UserRepository userRepository;
    private GameRepository gameRepository;
    private RoomRepository roomRepository;
    private DeviceRepository deviceRepository;

    @Transactional
    public BookingDto createBooking(BookingDto bookingDto, String username) {
        // 1. Lấy thông tin User từ token (username) để đảm bảo bảo mật
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found with username: " + username));

        Game game = gameRepository.findById(bookingDto.getGameId())
                .orElseThrow(() -> new RuntimeException("Game not found with id: " + bookingDto.getGameId()));
        if (bookingDto.getNumberOfPlayers() > game.getMaxPlayers()) {
            throw new RuntimeException("Number of players exceeds game's maxPlayers");
        }

        Room room = roomRepository.findById(bookingDto.getRoomId())
                .orElseThrow(() -> new RuntimeException("Room not found with id: " + bookingDto.getRoomId()));

        // 2. Kiểm tra Game/Room Compatibility
        if (!room.getGames().stream().anyMatch(g -> g.getId().equals(bookingDto.getGameId()))) {
            throw new RuntimeException("Game not supported in this room");
        }

        // 3. Validation thời gian: Đảm bảo thời gian hợp lệ và không nằm trong quá khứ
        LocalDateTime startTime = validateAndGetStartTime(bookingDto.getStartTime());
        if (startTime == null) {
            throw new RuntimeException("Invalid start time. Please select a valid time slot");
        }
        // Thêm kiểm tra thời gian hiện tại
        if (startTime.isBefore(LocalDateTime.now().truncatedTo(ChronoUnit.MINUTES))) {
            throw new RuntimeException("Start time cannot be in the past.");
        }

        int duration = game.getDuration();
        LocalDateTime endTime = startTime.plusMinutes(duration);

        // 4. Kiểm tra Room Availability và Devices
        if (!isRoomAvailable(room.getId(), startTime, endTime, bookingDto.getNumberOfPlayers())) {
            throw new RuntimeException("Room not available or insufficient devices for this time slot");
        }

        // 5. Tạo Booking
        Booking booking = BookingMapper.mapToBooking(bookingDto);
        // Gán User đã được xác thực
        booking.setUser(user);
        // Bỏ qua userId trong DTO để sử dụng userId đã được xác thực
        booking.setGame(game);
        booking.setRoom(room);
        booking.setStartTime(startTime);
        booking.setEndTime(endTime);
        booking.setStatus(BookingStatus.PENDING);
        booking.setPaymentStatus(PaymentStatus.UNPAID);
        booking.setNumberOfPlayers(bookingDto.getNumberOfPlayers());
        booking.setTotalAmount(calculateTotalAmount(game, bookingDto.getNumberOfPlayers(), duration));

        booking = bookingRepository.save(booking);
        return BookingMapper.mapToBookingDto(booking);
    }

    private double calculateTotalAmount(Game game, int numberOfPlayers, int duration) {
        return game.getPrice() * numberOfPlayers * (duration / 60.0);
    }

    private boolean isRoomAvailable(Long roomId, LocalDateTime start, LocalDateTime end, int requiredPlayers) {
        Room room = roomRepository.findById(roomId)
                .orElseThrow(() -> new RuntimeException("Room not found with id: " + roomId));
        if (room.getStatus() == RoomStatus.MAINTENANCE) {
            return false;
        }

        // check if there is a overlap in the order times of 2 different customers
        // Lấy tất cả các booking không bị CANCELLED để kiểm tra
        List<Booking> bookings = bookingRepository.findByRoomId(roomId)
                .stream()
                .filter(b -> b.getStatus() != BookingStatus.CANCELLED)
                .collect(Collectors.toList());

        // Check overlap full interval
        for (Booking b : bookings) {
            // Logic overlap: NOT (A kết thúc trước B bắt đầu HOẶC A bắt đầu sau B kết thúc)
            if (!(end.isBefore(b.getStartTime()) || start.isAfter(b.getEndTime()))) {
                return false; // overlap
            }
        }

        // available devices must be more than players
        Integer available = deviceRepository.sumAvailableDevicesByRoomIdAndStatus(roomId, DeviceStatus.AVAILABLE);
        int availableDevices = (available != null) ? available : 0;
        return availableDevices >= requiredPlayers;
    }

    private LocalDateTime validateAndGetStartTime(LocalDateTime startTime) {
        if (startTime == null) return null;

        // Bỏ comment logic kiểm tra thời gian quá khứ (đã chuyển lên createBooking để xử lý lỗi tốt hơn)

        List<LocalDateTime> validSlots = new ArrayList<>();
        // slot time: 8am, 10am, ..., 10pm (8h -> 22h)
        LocalDateTime dayStart = startTime.toLocalDate().atTime(8, 0);
        for (int h = 0; h <= 14; h += 2) {
            validSlots.add(dayStart.plusHours(h));
        }

        return validSlots.stream()
                .filter(slot -> slot.equals(startTime))
                .findFirst()
                .orElse(null);
    }

    /**
     * HÀM NỘI BỘ MỚI: Tính toán các khung giờ thực sự còn trống cho một Phòng và Game cụ thể trong một ngày.
     * Hàm này được thêm vào để làm rõ logic, nhưng KHÔNG ĐƯỢC CÔNG KHAI thành API.
     */
    private List<LocalDateTime> getAvailableSlotsForDate(Long roomId, Long gameId, LocalDateTime date) {
        Game game = gameRepository.findById(gameId)
                .orElseThrow(() -> new RuntimeException("Game not found with id: " + gameId));
        Room room = roomRepository.findById(roomId)
                .orElseThrow(() -> new RuntimeException("Room not found with id: " + roomId));

        List<LocalDateTime> availableSlots = new ArrayList<>();
        LocalDateTime now = LocalDateTime.now();

        // 1. Tạo tất cả các slot hợp lệ (8:00, 10:00, ..., 22:00)
        List<LocalDateTime> allValidSlots = new ArrayList<>();
        LocalDateTime dayStart = date.toLocalDate().atTime(8, 0);
        for (int h = 0; h <= 14; h += 2) {
            LocalDateTime slot = dayStart.plusHours(h);

            // Bỏ qua các slot đã qua trong ngày hiện tại
            // Lọc các slot đã qua: giờ phải lớn hơn hoặc bằng giờ hiện tại (làm tròn lên nếu có phút)
            LocalDateTime earliestValidStart = now.toLocalDate().equals(slot.toLocalDate()) ?
                    now.truncatedTo(ChronoUnit.HOURS).plusHours(now.getMinute() > 0 ? 1 : 0) :
                    slot.minusNanos(1); // Cho các ngày tương lai, luôn hợp lệ

            if (slot.isAfter(earliestValidStart) || slot.equals(earliestValidStart) || slot.toLocalDate().isAfter(now.toLocalDate())) {
                allValidSlots.add(slot);
            }
        }

        // 2. Lấy tất cả bookings không bị CANCELLED trong ngày
        LocalDateTime dayEnd = date.toLocalDate().atTime(23, 59, 59);
        List<Booking> existingBookings = bookingRepository.findByRoomIdAndStartTimeBetween(roomId, dayStart, dayEnd)
                .stream()
                .filter(b -> b.getStatus() != BookingStatus.CANCELLED)
                .collect(Collectors.toList());

        // Lấy số lượng thiết bị khả dụng hiện tại (Logic tĩnh - Cần số người chơi để kiểm tra chính xác)
        // Vì không có số người chơi, hàm này chỉ kiểm tra xung đột thời gian.

        // 3. Kiểm tra từng slot
        for (LocalDateTime slotStart : allValidSlots) {
            LocalDateTime slotEnd = slotStart.plusMinutes(game.getDuration());
            boolean isOverlapped = false;

            // Kiểm tra chồng lấn thời gian với các booking đã tồn tại
            for (Booking b : existingBookings) {
                // Kiểm tra overlap: NOT (A kết thúc trước B bắt đầu HOẶC A bắt đầu sau B kết thúc)
                if (!(slotEnd.isBefore(b.getStartTime()) || slotStart.isAfter(b.getEndTime()))) {
                    isOverlapped = true;
                    break;
                }
            }

            // Chỉ thêm vào nếu không bị chồng lấn và phòng không bảo trì
            if (!isOverlapped && room.getStatus() != RoomStatus.MAINTENANCE) {
                availableSlots.add(slotStart);
            }
        }

        return availableSlots;
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

    public List<BookingDto> getUserBookings(String username) {
        return bookingRepository.findByUsername(username).stream()
                .map(booking -> BookingMapper.mapToBookingDto(booking))
                .collect(Collectors.toList());
    }

    @Transactional
    public BookingDto updateBooking(Long id, BookingDto bookingDto, String username) {
        Booking existing = bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found with id: " + id));

        if (!existing.getUser().getUsername().equals(username)) {
            throw new RuntimeException("You can only update your own booking");
        }

        // 1. Lấy User đã xác thực (để đảm bảo không có thay đổi trái phép)
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found with username: " + username));

        // Lấy Game/Room mới từ DTO
        Game game = gameRepository.findById(bookingDto.getGameId())
                .orElseThrow(() -> new RuntimeException("Game not found with id: " + bookingDto.getGameId()));
        if (bookingDto.getNumberOfPlayers() > game.getMaxPlayers()) {
            throw new RuntimeException("Number of players exceeds game's maxPlayers");
        }

        Room room = roomRepository.findById(bookingDto.getRoomId())
                .orElseThrow(() -> new RuntimeException("Room not found with id: " + bookingDto.getRoomId()));

        if (!room.getGames().stream().anyMatch(g -> g.getId().equals(game.getId()))) {
            throw new RuntimeException("Game not supported in this room");
        }

        // Validate startTime và kiểm tra quá khứ
        LocalDateTime startTime = validateAndGetStartTime(bookingDto.getStartTime());
        if (startTime == null) {
            throw new RuntimeException("Invalid start time. Please select a valid time slot");
        }
        if (startTime.isBefore(LocalDateTime.now().truncatedTo(ChronoUnit.MINUTES))) {
            throw new RuntimeException("Start time cannot be in the past.");
        }

        int duration = game.getDuration();
        LocalDateTime endTime = startTime.plusMinutes(duration);

        // Check room availability for new slot, ignore current booking
        Long existingId = existing.getId();
        // Lấy tất cả booking không phải là booking đang được sửa VÀ không bị CANCELLED
        List<Booking> overlapping = bookingRepository.findByRoomId(room.getId())
                .stream()
                .filter(b -> !b.getId().equals(existingId) && b.getStatus() != BookingStatus.CANCELLED)
                .filter(b -> !(endTime.isBefore(b.getStartTime()) || startTime.isAfter(b.getEndTime()))) // Check overlap
                .collect(Collectors.toList());

        if (!overlapping.isEmpty()) {
            throw new RuntimeException("Room not available for this time slot");
        }

        // check devices
        Integer available = deviceRepository.sumAvailableDevicesByRoomIdAndStatus(room.getId(), DeviceStatus.AVAILABLE);
        int availableDevices = (available != null) ? available : 0;
        if (availableDevices < bookingDto.getNumberOfPlayers()) {
            throw new RuntimeException("Insufficient available devices for this time slot");
        }

        existing.setUser(user);
        existing.setGame(game);
        existing.setRoom(room);
        existing.setStartTime(startTime);
        existing.setEndTime(endTime);
        existing.setNumberOfPlayers(bookingDto.getNumberOfPlayers());
        existing.setStatus(BookingStatus.PENDING);
        existing.setPaymentStatus(PaymentStatus.UNPAID);
        existing.setTotalAmount(calculateTotalAmount(game, bookingDto.getNumberOfPlayers(), duration));

        existing = bookingRepository.save(existing);
        return BookingMapper.mapToBookingDto(existing);
    }


    @Transactional
    public BookingDto cancelBooking(Long id) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found with id: " + id));
        if (booking.getStatus() == BookingStatus.ACCEPTED && booking.getPaymentStatus() == PaymentStatus.PAID) {
            throw new RuntimeException("Cannot cancel accepted and paid booking");
        }
        booking.setStatus(BookingStatus.CANCELLED);
        booking = bookingRepository.save(booking);
        Room room = booking.getRoom();
        boolean hasOtherActive = bookingRepository.findByRoomId(room.getId()).stream()
                .anyMatch(b -> b.getStatus() != BookingStatus.CANCELLED);
        if (!hasOtherActive && room.getStatus() != RoomStatus.MAINTENANCE) {
            room.setStatus(RoomStatus.AVAILABLE);
            roomRepository.save(room);
        }
        return BookingMapper.mapToBookingDto(booking);
    }

    @Transactional
    public BookingDto acceptBooking(Long id) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found with id: " + id));
        if (booking.getStatus() != BookingStatus.PENDING) {
            throw new RuntimeException("Only PENDING bookings can be accepted");
        }
        booking.setStatus(BookingStatus.ACCEPTED);
        Room room = booking.getRoom();
        room.setStatus(RoomStatus.BOOKED);
        roomRepository.save(room);
        booking = bookingRepository.save(booking);
        return BookingMapper.mapToBookingDto(booking);
    }

    @Transactional
    public BookingDto confirmPayment(Long id) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found with id: " + id));
        if (booking.getStatus() != BookingStatus.ACCEPTED || booking.getPaymentStatus() != PaymentStatus.UNPAID) {
            throw new RuntimeException("Cannot confirm payment for this booking");
        }
        booking.setPaymentStatus(PaymentStatus.PAID);
        booking = bookingRepository.save(booking);
        return BookingMapper.mapToBookingDto(booking);
    }

    @Transactional
    public void deleteBooking(Long id) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found with id: " + id));
        if (booking.getStatus() == BookingStatus.ACCEPTED && booking.getPaymentStatus() == PaymentStatus.PAID) {
            throw new RuntimeException("Cannot delete accepted and paid booking");
        }
        bookingRepository.delete(booking);
    }

    @Scheduled(fixedRate = 1800000) // 30 mins
    public void checkPendingTimeouts() {
        LocalDateTime now = LocalDateTime.now();
        // Delete all CANCELLED bookings first
        List<Booking> cancelledBookings = bookingRepository.findByStatus(BookingStatus.CANCELLED);
        for (Booking booking : cancelledBookings) {
            // Sử dụng bookingRepository.deleteById thay vì gọi lại deleteBooking(id) để tránh lỗi RuntimeException
            bookingRepository.deleteById(booking.getId());
        }

        // Cancel pending bookings that have passed startTime and have not been paid
        List<Booking> pendingOverdue = bookingRepository.findByStatusAndPaymentStatusAndStartTimeBefore(
                BookingStatus.PENDING, PaymentStatus.UNPAID, now);
        for (Booking booking : pendingOverdue) {
            cancelBooking(booking.getId());
        }
    }
}