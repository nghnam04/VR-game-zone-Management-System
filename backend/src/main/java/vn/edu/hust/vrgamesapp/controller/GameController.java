package vn.edu.hust.vrgamesapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import vn.edu.hust.vrgamesapp.dto.GameDto;
import vn.edu.hust.vrgamesapp.service.GameService;

import java.util.List;

@RestController
@RequestMapping("/api/games")
public class GameController {
    @Autowired
    private GameService gameService;

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<GameDto> createGame(@RequestBody GameDto gameDto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(gameService.createGame(gameDto));
    }

    @GetMapping("/{id}")
    public ResponseEntity<GameDto> getGameById(@PathVariable Long id) {
        return ResponseEntity.ok(gameService.getGameById(id));
    }

    @GetMapping
    public ResponseEntity<List<GameDto>> getAllGames(@RequestParam(required = false) String genre) {
        return ResponseEntity.ok(gameService.getAllGames(genre));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<GameDto> updateGame(@PathVariable Long id, @RequestBody GameDto gameDto) {
        return ResponseEntity.ok(gameService.updateGame(id, gameDto));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> deleteGame(@PathVariable Long id) {
        gameService.deleteGame(id);
        return ResponseEntity.ok("Game deleted successfully");
    }
}