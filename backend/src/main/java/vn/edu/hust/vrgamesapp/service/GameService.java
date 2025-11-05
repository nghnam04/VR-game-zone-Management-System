package vn.edu.hust.vrgamesapp.service;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import vn.edu.hust.vrgamesapp.dto.GameDto;
import vn.edu.hust.vrgamesapp.entity.Game;
import vn.edu.hust.vrgamesapp.constant.GameGenre;
import vn.edu.hust.vrgamesapp.entity.Room;
import vn.edu.hust.vrgamesapp.mapper.GameMapper;
import vn.edu.hust.vrgamesapp.repository.BookingRepository;
import vn.edu.hust.vrgamesapp.repository.GameRepository;
import vn.edu.hust.vrgamesapp.repository.RoomRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class GameService {
    private GameRepository gameRepository;
    private RoomRepository roomRepository;
    private BookingRepository bookingRepository;

    @Transactional
    public GameDto createGame(GameDto gameDto) {
        Game game = new Game();
        game.setName(gameDto.getName());
        game.setGenre(gameDto.getGenre());
        game.setDescription(gameDto.getDescription());
        game.setDuration(gameDto.getDuration());
        game.setPrice(gameDto.getPrice());
        game.setMaxPlayers(gameDto.getMaxPlayers());

        if (gameDto.getRooms() != null && !gameDto.getRooms().isEmpty()) {
            List<Room> rooms = gameDto.getRooms().stream()
                    .map(roomId -> roomRepository.findById(roomId)
                            .orElseThrow(() -> new RuntimeException("Room not found with id: " + roomId)))
                    .collect(Collectors.toList());

            // check game 's max players <= room capacity
            for (Room r : rooms) {
                if (gameDto.getMaxPlayers() > r.getCapacity()) {
                    throw new RuntimeException("Game maxPlayers exceeds room capacity (room id: " + r.getId() + ")");
                }
            }

            game.setRooms(rooms);
        }

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

    @Transactional
    public GameDto updateGame(Long id, GameDto gameDto) {
        if (bookingRepository.existsByGameId(id)) {
            throw new RuntimeException("Cannot delete game with active booking");
        }
        Game existing = gameRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Game not found with id: " + id));

        existing.setName(gameDto.getName());
        existing.setGenre(gameDto.getGenre());
        existing.setDescription(gameDto.getDescription());
        existing.setDuration(gameDto.getDuration());
        existing.setPrice(gameDto.getPrice());
        existing.setMaxPlayers(gameDto.getMaxPlayers());

        if (gameDto.getRooms() != null && !gameDto.getRooms().isEmpty()) {
            List<Room> rooms = gameDto.getRooms().stream()
                    .map(roomId -> roomRepository.findById(roomId)
                            .orElseThrow(() -> new RuntimeException("Room not found with id: " + roomId)))
                    .collect(Collectors.toList());

            for (Room r : rooms) {
                if (gameDto.getMaxPlayers() > r.getCapacity()) {
                    throw new RuntimeException("Game maxPlayers exceeds room capacity (room id: " + r.getId() + ")");
                }
            }

            existing.setRooms(rooms);
        } else {
            existing.setRooms(null);
        }


        existing = gameRepository.save(existing);
        return GameMapper.mapToGameDto(existing);
    }

    @Transactional
    public void deleteGame(Long id) {
        Game game = gameRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Game not found"));
        if (bookingRepository.existsByGameId(id)) {
            throw new RuntimeException("Cannot delete game with active booking");
        }
        gameRepository.delete(game);
    }

}