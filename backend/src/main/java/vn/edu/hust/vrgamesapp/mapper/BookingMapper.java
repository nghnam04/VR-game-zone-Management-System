package vn.edu.hust.vrgamesapp.mapper;

import vn.edu.hust.vrgamesapp.dto.BookingDto;
import vn.edu.hust.vrgamesapp.entity.Booking;
import vn.edu.hust.vrgamesapp.entity.Game;
import vn.edu.hust.vrgamesapp.entity.Room;
import vn.edu.hust.vrgamesapp.entity.User;

public class BookingMapper {
    public static BookingDto mapToBookingDto(Booking booking) {
        if (booking == null) return null;
        BookingDto bookingDto = new BookingDto(
                booking.getId(),
                booking.getUser() != null ? booking.getUser().getId() : null,
                booking.getUser() != null ? booking.getUser().getName() : null,
                booking.getGame() != null ? booking.getGame().getId() : null,
                booking.getGame() != null ? booking.getGame().getName() : null,
                booking.getRoom() != null ? booking.getRoom().getId() : null,
                booking.getRoom() != null ? booking.getRoom().getName() : null,
                booking.getStartTime(),
                booking.getStatus(),
                booking.getNumberOfPlayers(),
                booking.getTotalAmount(),
                booking.getPaymentStatus()
        );
        return bookingDto;
    }

    public static Booking mapToBooking(BookingDto bookingDto) {
        if (bookingDto == null) return null;
        Booking booking = new Booking();
        booking.setId(bookingDto.getId());
        if (bookingDto.getUserId() != null) {
            User user = new User();
            user.setId(bookingDto.getUserId());
            booking.setUser(user);
        }
        if (bookingDto.getGameId() != null) {
            Game game = new Game();
            game.setId(bookingDto.getGameId());
            booking.setGame(game);
        }
        if (bookingDto.getRoomId() != null) {
            Room room = new Room();
            room.setId(bookingDto.getRoomId());
            booking.setRoom(room);
        }
        booking.setStartTime(bookingDto.getStartTime());
        booking.setStatus(bookingDto.getStatus());
        booking.setNumberOfPlayers(bookingDto.getNumberOfPlayers());
        booking.setTotalAmount(bookingDto.getTotalAmount());
        booking.setPaymentStatus(bookingDto.getPaymentStatus());
        return booking;
    }
}