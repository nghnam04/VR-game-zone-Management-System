package vn.edu.hust.vrgamesapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import vn.edu.hust.vrgamesapp.constant.RoomStatus;
import vn.edu.hust.vrgamesapp.entity.Room;

import java.util.List;

public interface RoomRepository extends JpaRepository<Room, Long> {
    List<Room> findByStatus(RoomStatus roomStatus);

    List<Room> findByCapacityGreaterThanEqual(Integer capacity);
}
