package vn.edu.hust.vrgamesapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import vn.edu.hust.vrgamesapp.constant.GameGenre;
import vn.edu.hust.vrgamesapp.entity.Game;

import java.util.Collection;
import java.util.List;

public interface GameRepository extends JpaRepository<Game, Long> {
    List<Game> findByGenre(GameGenre gameGenre);
}
