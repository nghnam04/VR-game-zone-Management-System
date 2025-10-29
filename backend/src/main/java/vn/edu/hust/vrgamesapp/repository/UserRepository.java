package vn.edu.hust.vrgamesapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import vn.edu.hust.vrgamesapp.entity.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    boolean existsByUsername(String username);
    Optional<User> findByUsername(String username);

    boolean existsByEmail(String email);
}