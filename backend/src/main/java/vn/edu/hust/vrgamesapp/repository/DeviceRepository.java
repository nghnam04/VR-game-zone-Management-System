package vn.edu.hust.vrgamesapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import vn.edu.hust.vrgamesapp.constant.DeviceStatus;
import vn.edu.hust.vrgamesapp.constant.DeviceType;
import vn.edu.hust.vrgamesapp.entity.Device;

import java.util.List;

public interface DeviceRepository extends JpaRepository<Device, Long> {

    boolean existsByRoomIdAndNameAndType(Long roomId, String name, DeviceType type);
    List<Device> findByRoomId(Long roomId);

    @Query("SELECT SUM(d.quantity) FROM Device d WHERE d.room.id = :roomId AND d.status = :status")
    Integer sumAvailableDevicesByRoomIdAndStatus(@Param("roomId") Long roomId, @Param("status") DeviceStatus status);

}