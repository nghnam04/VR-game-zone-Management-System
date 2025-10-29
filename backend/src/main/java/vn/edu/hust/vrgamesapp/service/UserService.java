package vn.edu.hust.vrgamesapp.service;

import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import vn.edu.hust.vrgamesapp.dto.UserDto;
import vn.edu.hust.vrgamesapp.entity.Role;
import vn.edu.hust.vrgamesapp.entity.User;
import vn.edu.hust.vrgamesapp.mapper.UserMapper;
import vn.edu.hust.vrgamesapp.repository.RoleRepository;
import vn.edu.hust.vrgamesapp.repository.UserRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class UserService {
    private UserRepository userRepository;
    private RoleRepository roleRepository;
    private PasswordEncoder passwordEncoder;

    @Transactional
    public UserDto createUser(UserDto userDto) {
        if (userDto.getRole() == null || userDto.getRole().getId() == null) {
            throw new RuntimeException("Role is required");
        }

        Role role = roleRepository.findById(userDto.getRole().getId())
                .orElseThrow(() -> new RuntimeException("Role not found with id: " + userDto.getRole().getId()));

        if ("ADMIN".equalsIgnoreCase(role.getName().name())) {
            throw new RuntimeException("Cannot create user with ADMIN role");
        }

        if (userRepository.existsByUsername(userDto.getUsername())) {
            throw new RuntimeException("Username already exists");
        }

        if (userRepository.existsByEmail(userDto.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        if (!role.getName().equals(userDto.getRole().getName())) {
            throw new RuntimeException("Role id and role name do not match");
        }

        User user = UserMapper.mapToUser(userDto);
        user.setRole(role);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user = userRepository.save(user);
        return UserMapper.mapToUserDto(user);
    }

    public List<UserDto> getAllUsers() {
        return userRepository.findAll().stream()
                .filter(user -> !"ADMIN".equalsIgnoreCase(user.getRole().getName().name()))
                .map(UserMapper::mapToUserDto)
                .collect(Collectors.toList());
    }

    public UserDto getUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));

        if ("ADMIN".equalsIgnoreCase(user.getRole().getName().name())) {
            throw new RuntimeException("Access denied for ADMIN user");
        }
        return UserMapper.mapToUserDto(user);
    }


    @Transactional
    public UserDto updateUser(Long id, UserDto userDto) {
        User existing = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));

        if ("ADMIN".equalsIgnoreCase(existing.getRole().getName().name())) {
            throw new RuntimeException("Cannot update ADMIN user");
        }

        if (userDto.getRole() == null || userDto.getRole().getId() == null) {
            throw new RuntimeException("Role is required");
        }

        Role role = roleRepository.findById(userDto.getRole().getId())
                .orElseThrow(() -> new RuntimeException("Role not found with id: " + userDto.getRole().getId()));

        if (!role.getName().equals(userDto.getRole().getName())) {
            throw new RuntimeException("Role id and role name do not match");
        }

        if ("ADMIN".equalsIgnoreCase(role.getName().name())) {
            throw new RuntimeException("Cannot assign ADMIN role");
        }

        if (!existing.getUsername().equals(userDto.getUsername())
                && userRepository.existsByUsername(userDto.getUsername())) {
            throw new RuntimeException("Username already exists");
        }

        existing.setUsername(userDto.getUsername());
        existing.setEmail(userDto.getEmail());
        existing.setName(userDto.getName());
        existing.setRole(role);

        existing = userRepository.save(existing);
        return UserMapper.mapToUserDto(existing);
    }

    @Transactional
    public void deleteUser(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));

        if (user.getRole().getName().equals("ADMIN")) {
            throw new RuntimeException("Cannot delete ADMIN user");
        }
        if (user.getFeedbacks() != null && !user.getFeedbacks().isEmpty()) {
            user.getFeedbacks().clear();
        }

        if (user.getBookings() != null && !user.getBookings().isEmpty()) {
            user.getBookings().clear();
        }

        userRepository.delete(user);
    }
}