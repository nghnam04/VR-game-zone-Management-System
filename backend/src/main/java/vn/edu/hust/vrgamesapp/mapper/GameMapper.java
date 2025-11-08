package vn.edu.hust.vrgamesapp.mapper;

import vn.edu.hust.vrgamesapp.dto.GameDto;
import vn.edu.hust.vrgamesapp.entity.Game;
import vn.edu.hust.vrgamesapp.entity.Room;

import java.util.List;
import java.util.stream.Collectors;

public class GameMapper {

    public static GameDto mapToGameDto(Game game) {
        if (game == null) return null;
        
        List<Long> roomIds = game.getRooms() != null
                ? game.getRooms().stream().map(Room::getId).collect(Collectors.toList())
                : null;

        List<String> roomNames = game.getRooms() != null
                ? game.getRooms().stream().map(Room::getName).collect(Collectors.toList())
                : null;

        GameDto gameDto = new GameDto();
        gameDto.setId(game.getId());
        gameDto.setName(game.getName());
        gameDto.setGenre(game.getGenre());
        gameDto.setDescription(game.getDescription());
        gameDto.setDuration(game.getDuration());
        gameDto.setPrice(game.getPrice());
        gameDto.setRooms(roomIds);
        gameDto.setMaxPlayers(game.getMaxPlayers());
        gameDto.setRoomNames(roomNames);
        gameDto.setImageUrl(game.getImageUrl());

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
        game.setMaxPlayers(gameDto.getMaxPlayers());

        if (gameDto.getRooms() != null) {
            List<Room> rooms = gameDto.getRooms().stream().map(id -> {
                Room room = new Room();
                room.setId(id);
                return room;
            }).collect(Collectors.toList());
            game.setRooms(rooms);
        }

        game.setImageUrl(gameDto.getImageUrl());

        return game;
    }
}
