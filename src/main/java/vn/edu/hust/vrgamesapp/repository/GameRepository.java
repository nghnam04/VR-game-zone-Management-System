package vn.edu.hust.vrgamesapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import vn.edu.hust.vrgamesapp.entity.Game;

public interface GameRepository extends JpaRepository<Game, Long> {
}
