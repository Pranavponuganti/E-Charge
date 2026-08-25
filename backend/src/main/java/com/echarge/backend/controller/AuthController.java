package com.echarge.backend.controller;

import com.echarge.backend.dto.ApiResponse;
import com.echarge.backend.dto.LoginRequest;
import com.echarge.backend.dto.SignupRequest;
import com.echarge.backend.model.User;
import com.echarge.backend.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/signup")
    public ResponseEntity<ApiResponse<User>> signup(@Valid @RequestBody SignupRequest request) {
        try {
            User newUser = authService.signup(request);
            return ResponseEntity.ok(ApiResponse.ok("Registration successful. Welcome to E-CHARGE!", newUser));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(ApiResponse.error("Failed to create account: " + e.getMessage()));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<User>> login(@Valid @RequestBody LoginRequest request) {
        try {
            User user = authService.login(request);
            return ResponseEntity.ok(ApiResponse.ok("Login successful", user));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(ApiResponse.error("Authentication error: " + e.getMessage()));
        }
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<ApiResponse<User>> getUserProfile(@PathVariable Long id) {
        Optional<User> user = authService.getUserById(id);
        return user.map(u -> ResponseEntity.ok(ApiResponse.ok(u)))
                .orElseGet(() -> ResponseEntity.badRequest().body(ApiResponse.error("User not found")));
    }
}
