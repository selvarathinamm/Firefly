package com.vvfirefly.backend.controller;

import com.vvfirefly.backend.model.User;
import com.vvfirefly.backend.repository.UserRepository;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.nio.charset.StandardCharsets;
import java.util.*;

@RestController
@CrossOrigin(origins = {
    "http://localhost:5173",
    "https://vvfirefly-connect.netlify.app"
})
public class AuthController {

    private final UserRepository userRepository;

    @Value("${jwt.secret}")
    private String SECRET_KEY;

    public AuthController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestParam String username,
                                                     @RequestParam String password) {
        Map<String, String> response = new HashMap<>();

        // Find user by email (username = email)
        Optional<User> userOpt = userRepository.findByEmail(username);

        if (userOpt.isPresent()) {
            User user = userOpt.get();

            // Validate password (plain text now, use BCrypt later)
            if (user.getPassword().equals(password)) {
                // 🧾 Generate JWT
                String token = Jwts.builder()
                        .setSubject(user.getEmail())
                        .claim("name", user.getName())
                        .setIssuedAt(new Date())
                        .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60)) // 1 hour expiry
                        .signWith(Keys.hmacShaKeyFor(SECRET_KEY.getBytes(StandardCharsets.UTF_8)), SignatureAlgorithm.HS256)
                        .compact();

                response.put("access_token", token);
                response.put("message", "Login successful!");
                return ResponseEntity.ok(response);
            }
        }

        // ❌ Invalid credentials
        response.put("error", "Invalid email or password");
        return ResponseEntity.status(401).body(response);
    }
}
