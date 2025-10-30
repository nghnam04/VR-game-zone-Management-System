package vn.edu.hust.vrgamesapp.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import vn.edu.hust.vrgamesapp.dto.JwtAuthResponse;
import vn.edu.hust.vrgamesapp.dto.LoginDto;
import vn.edu.hust.vrgamesapp.dto.RegisterDto;
import vn.edu.hust.vrgamesapp.service.AuthenticationService;

@RestController
@RequestMapping("/api/auth")
@AllArgsConstructor
public class AuthenticationController {
    private AuthenticationService authenticationService;

    @PostMapping(value = {"/login", "/signin"})
    public ResponseEntity<JwtAuthResponse> login(@Valid @RequestBody LoginDto loginDto){
        String token = authenticationService.login(loginDto);

        JwtAuthResponse jwtAuthResponse = new JwtAuthResponse();
        jwtAuthResponse.setAccessToken(token);
        return ResponseEntity.ok(jwtAuthResponse);
    }

    @PostMapping(value = {"/register", "/signup"})
    public ResponseEntity<String> register(@Valid @RequestBody RegisterDto registerDto) {
        String response = authenticationService.register(registerDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PostMapping(value = {"/logout", "/signout"})
    public ResponseEntity<String> logout(HttpServletRequest request) {
        authenticationService.logout(request);
        return ResponseEntity.ok("Logout successful");
    }
}