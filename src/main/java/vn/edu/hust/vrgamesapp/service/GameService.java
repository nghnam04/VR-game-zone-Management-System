package vn.edu.hust.vrgamesapp.service;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import vn.edu.hust.vrgamesapp.dto.GameDto;
import vn.edu.hust.vrgamesapp.entity.Game;
import vn.edu.hust.vrgamesapp.constant.GameGenre;
import vn.edu.hust.vrgamesapp.mapper.GameMapper;
import vn.edu.hust.vrgamesapp.repository.GameRepository;
import vn.edu.hust.vrgamesapp.repository.RoomRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class GameService {
    private GameRepository gameRepository;
    private RoomRepository roomRepository;

    public GameDto createGame(GameDto gameDto) {
        if (gameDto.getRooms() != null) {
            gameDto.getRooms().forEach(roomId -> roomRepository.findById(roomId)
                    .orElseThrow(() -> new RuntimeException("Room not found with id: " + roomId)));
        }
        Game game = GameMapper.mapToGame(gameDto);
        game = gameRepository.save(game);
        return GameMapper.mapToGameDto(game);
    }

    public GameDto getGameById(Long id) {
        Game game = gameRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Game not found with id: " + id));
        return GameMapper.mapToGameDto(game);
    }

    public List<GameDto> getAllGames(String genre) {
        if (genre != null && !genre.isEmpty()) {
            try {
                GameGenre gameGenre = GameGenre.valueOf(genre.toUpperCase());
                return gameRepository.findByGenre(gameGenre).stream()
                        .map(game -> GameMapper.mapToGameDto(game))
                        .collect(Collectors.toList());
            } catch (IllegalArgumentException e) {
                throw new RuntimeException("Invalid genre: " + genre);
            }
        }
        return gameRepository.findAll().stream()
                .map(game -> GameMapper.mapToGameDto(game))
                .collect(Collectors.toList());
    }

    public GameDto updateGame(Long id, GameDto gameDto) {
        Game existing = gameRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Game not found with id: " + id));
        if (gameDto.getRooms() != null) {
            gameDto.getRooms().forEach(roomId -> roomRepository.findById(roomId)
                    .orElseThrow(() -> new RuntimeException("Room not found with id: " + roomId)));
        }
        existing.setName(gameDto.getName());
        existing.setGenre(gameDto.getGenre());
        existing.setDescription(gameDto.getDescription());
        existing.setDuration(gameDto.getDuration());
        existing.setPrice(gameDto.getPrice());
        existing.setRooms(GameMapper.mapToGame(gameDto).getRooms());
        existing = gameRepository.save(existing);
        return GameMapper.mapToGameDto(existing);
    }

    public void deleteGame(Long id) {
        if (!gameRepository.existsById(id)) {
            throw new RuntimeException("Game not found with id: " + id);
        }
        gameRepository.deleteById(id);
    }
}