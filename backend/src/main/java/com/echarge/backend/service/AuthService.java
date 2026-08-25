package com.echarge.backend.service;

import com.echarge.backend.dto.LoginRequest;
import com.echarge.backend.dto.SignupRequest;
import com.echarge.backend.model.User;
import com.echarge.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    private final UserRepository userRepository;

    public AuthService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User signup(SignupRequest request) {
        // Validate password and confirm password match
        if (request.getPassword() == null || !request.getPassword().equals(request.getConfirmPassword())) {
            throw new IllegalArgumentException("Passwords do not match. Please verify your confirm password.");
        }

        if (userRepository.existsByEmail(request.getEmail().trim().toLowerCase())) {
            throw new IllegalArgumentException("An account with email " + request.getEmail() + " already exists.");
        }

        User user = new User(
                request.getName().trim(),
                request.getEmail().trim().toLowerCase(),
                request.getPassword(), // In production we would hash with BCrypt
                request.getPhone() != null ? request.getPhone().trim() : "",
                request.getCarBrand() != null ? request.getCarBrand().trim() : "Custom EV",
                request.getCarModel() != null ? request.getCarModel().trim() : "Standard EV",
                request.getChargerType() != null ? request.getChargerType().trim() : "CCS2",
                request.getBatteryCapacity() != null ? request.getBatteryCapacity() : 60.0
        );

        return userRepository.save(user);
    }

    public User login(LoginRequest request) {
        String email = request.getEmail().trim().toLowerCase();
        Optional<User> userOpt = userRepository.findByEmail(email);

        if (userOpt.isEmpty()) {
            // Check if matches demo profile or create on the fly if needed for fast sandbox testing
            throw new IllegalArgumentException("No account found with email: " + email);
        }

        User user = userOpt.get();
        if (!user.getPassword().equals(request.getPassword())) {
            throw new IllegalArgumentException("Invalid password. Please check your credentials.");
        }

        return user;
    }

    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email.trim().toLowerCase());
    }
}
