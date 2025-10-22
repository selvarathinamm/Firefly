package com.vvfirefly.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin(origins = {
    "http://localhost:5173",
    "https://vvfirefly.netlify.app"
})
public class AuthController {

    @PostMapping("/register")
    public ResponseEntity<Map<String, String>> register(@RequestBody Map<String, String> body) {
        Map<String, String> response = new HashMap<>();
        response.put("message", "Register successful!");
        return ResponseEntity.ok(response);
    }

    @PostMapping("/token")
    public ResponseEntity<Map<String, String>> login(@RequestParam String username, @RequestParam String password) {
        Map<String, String> response = new HashMap<>();

        if ("abcd@gmail.com".equals(username) && "12345678".equals(password)) {
            response.put("access_token", "mock-token-1234");
            response.put("message", "Login successful!");
            return ResponseEntity.ok(response);
        } else {
            response.put("error", "Invalid credentials");
            return ResponseEntity.status(401).body(response);
        }
    }

    @GetMapping("/hello")
    public String hello() {
        return "Welcome to VVFirefly Dashboard (mock login success)";
    }

    @GetMapping("/")
    public String home() {
        return "✅ VVFirefly mock backend running successfully!";
    }
}
