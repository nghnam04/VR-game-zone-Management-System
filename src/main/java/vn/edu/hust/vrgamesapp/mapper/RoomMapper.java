package vn.edu.hust.vrgamesapp.mapper;

import vn.edu.hust.vrgamesapp.dto.RoomDto;
import vn.edu.hust.vrgamesapp.entity.Room;

public class RoomMapper {
    public static RoomDto mapToRoomDto(Room room) {
        if (room == null) return null;
        RoomDto roomDto = new RoomDto(
                room.getId(),
                room.getName(),
                room.getCapacity(),
                room.getStatus()
        );
        return roomDto;
    }

    public static Room mapToRoom(RoomDto roomDto) {
        if (roomDto == null) return null;
        Room room = new Room(
                roomDto.getId(),
                roomDto.getName(),
                roomDto.getCapacity(),
                roomDto.getStatus()
        );
        return room;
    }
}
