package vn.edu.hust.vrgamesapp.mapper;

import vn.edu.hust.vrgamesapp.dto.UserDto;
import vn.edu.hust.vrgamesapp.entity.User;

public class UserMapper {
    public static UserDto mapToUserDto(User user) {
        if (user == null) return null;
        return new UserDto(
                user.getId(),
                user.getName(),
                user.getUsername(),
                user.getEmail(),
                null,
                RoleMapper.mapToRoleDto(user.getRole())
        );
    }

    public static User mapToUser(UserDto userDto) {
        if (userDto == null) return null;
        User user = new User();
        user.setId(userDto.getId());
        user.setUsername(userDto.getUsername());
        user.setEmail(userDto.getEmail());
        user.setName(userDto.getName());
        user.setPassword(userDto.getPassword());
        user.setRole(RoleMapper.mapToRole(userDto.getRole()));
        return user;
    }
}
