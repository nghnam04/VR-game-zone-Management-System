package vn.edu.hust.vrgamesapp.mapper;

import vn.edu.hust.vrgamesapp.dto.RoomDto;
import vn.edu.hust.vrgamesapp.entity.Game;
import vn.edu.hust.vrgamesapp.entity.Room;

import java.util.List;
import java.util.stream.Collectors;

public class RoomMapper {
    public static RoomDto mapToRoomDto(Room room) {
        if (room == null) return null;
        List<Long> games = room.getGames() != null ? room.getGames().stream().map(Game::getId).collect(Collectors.toList()) : null;
        RoomDto roomDto = new RoomDto(
                room.getId(),
                room.getName(),
                room.getCapacity(),
                room.getStatus(),
                games
        );
        return roomDto;
    }

    public static Room mapToRoom(RoomDto roomDto) {
        if (roomDto == null) return null;
        Room room = new Room();
        room.setId(roomDto.getId());
        room.setName(roomDto.getName());
        room.setCapacity(roomDto.getCapacity());
        room.setStatus(roomDto.getStatus());
        if (roomDto.getGames() != null) {
            List<Game> games = roomDto.getGames().stream().map(id -> {
                Game game = new Game();
                game.setId(id);
                return game;
            }).collect(Collectors.toList());
            room.setGames(games);
        }
        return room;
    }
}
