package vn.edu.hust.vrgamesapp.service;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import vn.edu.hust.vrgamesapp.constant.RoleEnum;
import vn.edu.hust.vrgamesapp.dto.LoginDto;
import vn.edu.hust.vrgamesapp.dto.RegisterDto;
import vn.edu.hust.vrgamesapp.entity.Role;
import vn.edu.hust.vrgamesapp.entity.User;
import vn.edu.hust.vrgamesapp.exception.VrAPIException;
import vn.edu.hust.vrgamesapp.repository.RoleRepository;
import vn.edu.hust.vrgamesapp.repository.UserRepository;
import vn.edu.hust.vrgamesapp.security.JwtTokenProvider;

@Service
@AllArgsConstructor
public class AuthenticationService {

    private AuthenticationManager authenticationManager;
    private UserRepository userRepository;
    private RoleRepository roleRepository;
    private PasswordEncoder passwordEncoder;
    private JwtTokenProvider jwtTokenProvider;

    public String login(LoginDto loginDto){
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                loginDto.getUsername(), loginDto.getPassword()
        ));
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String token = jwtTokenProvider.generateToken(authentication);
        return token;
    }

    public String register(RegisterDto registerDto) {
        if (userRepository.existsByUsername(registerDto.getUsername())) {
            throw new VrAPIException(HttpStatus.BAD_REQUEST, "Username is already exists!");
        }

        if (userRepository.existsByEmail(registerDto.getEmail())) {
            throw new VrAPIException(HttpStatus.BAD_REQUEST, "Email is already exists!");
        }

        User user = new User();
        user.setName(registerDto.getName());
        user.setUsername(registerDto.getUsername());
        user.setEmail(registerDto.getEmail());
        user.setPassword(passwordEncoder.encode(registerDto.getPassword()));
        //user.setPassword(registerDto.getPassword());

        Role userRole = roleRepository.findByName(RoleEnum.CUSTOMER)
                .orElseThrow(() -> new VrAPIException(HttpStatus.NOT_FOUND, "User role not found"));
        user.setRole(userRole);

        userRepository.save(user);
        return "User registered successfully!";
    }
}