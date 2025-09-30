package vn.edu.hust.vrgamesapp.mapper;

import vn.edu.hust.vrgamesapp.dto.GameDto;
import vn.edu.hust.vrgamesapp.entity.Game;

public class GameMapper {
    public static GameDto mapToGameDto(Game game) {
        if (game == null) return null;
        GameDto gameDto = new GameDto(
                game.getId(),
                game.getName(),
                game.getDescription(),
                game.getDuration(),
                game.getPrice()
        );
        return gameDto;
    }

    public static Game mapToGame(GameDto gameDto) {
        if (gameDto == null) return null;
        Game game = new Game(
                gameDto.getId(),
                gameDto.getName(),
                gameDto.getDescription(),
                gameDto.getDuration(),
                gameDto.getPrice()
        );
        return game;
    }
}
