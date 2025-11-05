package vn.edu.hust.vrgamesapp.mapper;

import vn.edu.hust.vrgamesapp.dto.DeviceDto;
import vn.edu.hust.vrgamesapp.dto.RoomDto;
import vn.edu.hust.vrgamesapp.entity.Device;
import vn.edu.hust.vrgamesapp.entity.Game;
import vn.edu.hust.vrgamesapp.entity.Room;

import java.util.List;
import java.util.stream.Collectors;

public class RoomMapper {

    public static RoomDto mapToRoomDto(Room room) {
        if (room == null) return null;

        RoomDto dto = new RoomDto();
        dto.setId(room.getId());
        dto.setName(room.getName());
        dto.setCapacity(room.getCapacity());
        dto.setStatus(room.getStatus());

        dto.setGames(room.getGames() != null
                ? room.getGames().stream().map(Game::getId).toList()
                : null);
        dto.setDevices(room.getDevices() != null
                ? room.getDevices().stream().map(Device::getId).toList()
                : null);

        dto.setGameNames(room.getGames() != null
                ? room.getGames().stream().map(Game::getName).toList()
                : null);
        dto.setDeviceNames(room.getDevices() != null
                ? room.getDevices().stream().map(Device::getName).toList()
                : null);

        return dto;
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
