package vn.edu.hust.vrgamesapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import vn.edu.hust.vrgamesapp.entity.Role;

public interface RoleRepository extends JpaRepository<Role, Long> {
}
