package com.vvfirefly.backend.controller;

import com.vvfirefly.backend.model.User;
import com.vvfirefly.backend.repository.UserRepository;
import com.vvfirefly.backend.security.JwtService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthController(UserRepository userRepository,
                          PasswordEncoder passwordEncoder,
                          JwtService jwtService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    @PostMapping("/register")
    public ResponseEntity<Map<String, String>> register(@RequestBody User request) {
        Map<String, String> resp = new HashMap<>();

        if (request.getEmail() == null || request.getPassword() == null) {
            resp.put("error", "Email and password are required");
            return ResponseEntity.badRequest().body(resp);
        }

        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            resp.put("error", "User already exists");
            return ResponseEntity.status(409).body(resp);
        }

        User user = new User();
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        // set other fields from request as needed
        userRepository.save(user);

        resp.put("message", "Register successful");
        return ResponseEntity.ok(resp);
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody User request) {
        Map<String, String> resp = new HashMap<>();

        if (request.getEmail() == null || request.getPassword() == null) {
            resp.put("error", "Email and password are required");
            return ResponseEntity.badRequest().body(resp);
        }

        User user = userRepository.findByEmail(request.getEmail())
                .orElse(null);

        if (user == null || !passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            resp.put("error", "Invalid credentials");
            return ResponseEntity.status(401).body(resp);
        }

        String token = jwtService.generateToken(user.getEmail());
        resp.put("access_token", token);
        resp.put("message", "Login successful");
        return ResponseEntity.ok(resp);
    }

    @GetMapping("/hello")
    public String hello() {
        return "Welcome to VVFirefly Dashboard";
    }

    @GetMapping("/")
    public String home() {
        return "✅ VVFirefly backend running successfully!";
    }
}