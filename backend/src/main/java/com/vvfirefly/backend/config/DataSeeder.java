package com.vvfirefly.backend.config;

import com.vvfirefly.backend.model.User;
import com.vvfirefly.backend.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DataSeeder {

    @Bean
    CommandLineRunner initDatabase(UserRepository userRepository) {
        return args -> {
            String defaultEmail = "tester@gmail.com";

            // 🔍 Check if user already exists
            userRepository.findByEmail(defaultEmail).ifPresentOrElse(
                user -> {
                    System.out.println("✅ Default user already exists: " + defaultEmail);
                },
                () -> {
                    // 🧩 Create new user if not found
                    User newUser = new User("Tester", defaultEmail, "firefly@123");
                    userRepository.save(newUser);
                    System.out.println("🌱 Default user created: " + defaultEmail);
                }
            );
        };
    }
}
