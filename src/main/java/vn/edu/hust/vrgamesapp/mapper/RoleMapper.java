package vn.edu.hust.vrgamesapp.mapper;

import vn.edu.hust.vrgamesapp.dto.RoleDto;
import vn.edu.hust.vrgamesapp.entity.Role;

public class RoleMapper {
    public static RoleDto mapToRoleDto(Role role) {
        if (role == null) return null;
        RoleDto roleDto = new RoleDto(
                role.getId(),
                role.getName()
        );
        return roleDto;
    }

    public static Role mapToRole(RoleDto roleDto) {
        if (roleDto == null) return null;
        Role role = new Role(
                roleDto.getId(),
                roleDto.getName()
        );
        return role;
    }
}
