package com.vvfirefly.backend;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {

    @GetMapping("/")
    public String home() {
        return "VVFirefly Backend is running successfully on Render!";
    }

    @GetMapping("/hello")
    public String hello() {
        return "Hello from VVFirefly Backend 🚀";
    }
}
