package vn.edu.hust.vrgamesapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import vn.edu.hust.vrgamesapp.constant.RoleEnum;
import vn.edu.hust.vrgamesapp.entity.Role;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(RoleEnum name);
}
