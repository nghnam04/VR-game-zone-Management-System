package vn.edu.hust.vrgamesapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import vn.edu.hust.vrgamesapp.entity.Device;

public interface DeviceRepository extends JpaRepository<Device, Long> {
}
