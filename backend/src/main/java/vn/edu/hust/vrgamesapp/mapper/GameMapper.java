package vn.edu.hust.vrgamesapp.mapper;

import vn.edu.hust.vrgamesapp.dto.GameDto;
import vn.edu.hust.vrgamesapp.entity.Game;
import vn.edu.hust.vrgamesapp.entity.Room;

import java.util.List;
import java.util.stream.Collectors;

public class GameMapper {
    public static GameDto mapToGameDto(Game game) {
        if (game == null) return null;
        List<Long> rooms = game.getRooms() != null ? game.getRooms().stream().map(Room::getId).collect(Collectors.toList()) : null;
        GameDto gameDto = new GameDto(
                game.getId(),
                game.getName(),
                game.getGenre(),
                game.getDescription(),
                game.getDuration(),
                game.getPrice(),
                rooms,
                game.getMaxPlayers()
        );
        return gameDto;
    }

    public static Game mapToGame(GameDto gameDto) {
        if (gameDto == null) return null;
        Game game = new Game();
        game.setId(gameDto.getId());
        game.setName(gameDto.getName());
        game.setGenre(gameDto.getGenre());
        game.setDescription(gameDto.getDescription());
        game.setDuration(gameDto.getDuration());
        game.setPrice(gameDto.getPrice());
        if (gameDto.getRooms() != null) {
            List<Room> rooms = gameDto.getRooms().stream().map(id -> {
                Room room = new Room();
                room.setId(id);
                return room;
            }).collect(Collectors.toList());
            game.setRooms(rooms);
        }
        game.setMaxPlayers(gameDto.getMaxPlayers());
        return game;
    }
}