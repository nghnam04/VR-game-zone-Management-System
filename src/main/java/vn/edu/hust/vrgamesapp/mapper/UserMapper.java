package vn.edu.hust.vrgamesapp.mapper;

import vn.edu.hust.vrgamesapp.dto.UserDto;
import vn.edu.hust.vrgamesapp.entity.User;

public class UserMapper {
    public static UserDto mapToUserDto(User user) {
        if (user == null) return null;
        UserDto userDto = new UserDto(
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                RoleMapper.mapToRoleDto(user.getRole())
        );
        return userDto;
    }

    public static User mapToUser(UserDto userDto) {
        if (userDto == null) return null;
        User user = new User();
        user.setId(userDto.getId());
        user.setUsername(userDto.getUsername());
        user.setEmail(userDto.getEmail());
        user.setRole(RoleMapper.mapToRole(userDto.getRole()));
        return user;
    }
}
