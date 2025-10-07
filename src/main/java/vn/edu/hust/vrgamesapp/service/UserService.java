package vn.edu.hust.vrgamesapp.service;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import vn.edu.hust.vrgamesapp.dto.UserDto;
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

    public UserDto createUser(UserDto userDto) {
        if (userDto.getRole() == null || userDto.getRole().getId() == null) {
            throw new RuntimeException("Role is required");
        }
        roleRepository.findById(userDto.getRole().getId())
                .orElseThrow(() -> new RuntimeException("Role not found with id: " + userDto.getRole().getId()));
        if (userRepository.existsByUsername(userDto.getUsername())) {
            throw new RuntimeException("Username already exists");
        }
        User user = UserMapper.mapToUser(userDto);
        user = userRepository.save(user);
        return UserMapper.mapToUserDto(user);
    }

    public UserDto getUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));
        return UserMapper.mapToUserDto(user);
    }

    public List<UserDto> getAllUsers() {
        return userRepository.findAll().stream()
                .map(user -> UserMapper.mapToUserDto(user))
                .collect(Collectors.toList());
    }

    public UserDto updateUser(Long id, UserDto userDto) {
        User existing = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));
        if (userDto.getRole() == null || userDto.getRole().getId() == null) {
            throw new RuntimeException("Role is required");
        }
        roleRepository.findById(userDto.getRole().getId())
                .orElseThrow(() -> new RuntimeException("Role not found with id: " + userDto.getRole().getId()));
        if (!existing.getUsername().equals(userDto.getUsername()) && userRepository.existsByUsername(userDto.getUsername())) {
            throw new RuntimeException("Username already exists");
        }
        existing.setUsername(userDto.getUsername());
        existing.setEmail(userDto.getEmail());
        existing.setRole(UserMapper.mapToUser(userDto).getRole());
        existing = userRepository.save(existing);
        return UserMapper.mapToUserDto(existing);
    }

    public void deleteUser(Long id) {
        if (!userRepository.existsById(id)) {
            throw new RuntimeException("User not found with id: " + id);
        }
        userRepository.deleteById(id);
    }
}