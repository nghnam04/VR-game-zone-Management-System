package vn.edu.hust.vrgamesapp.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import vn.edu.hust.vrgamesapp.constant.RoomStatus;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class RoomDto {
    private Long id;
    private String name;
    private int capacity;
    private RoomStatus status;
}
