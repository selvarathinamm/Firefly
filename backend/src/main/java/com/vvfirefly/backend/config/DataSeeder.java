package com.vvfirefly.backend.config;

import com.vvfirefly.backend.model.User;
import com.vvfirefly.backend.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Configuration
public class DataSeeder {

    @Bean
    CommandLineRunner initDatabase(UserRepository userRepository) {
        return args -> {
            if (userRepository.findByEmail("tester@vvcoe.com").isEmpty()) {
                User tester = new User();
                tester.setEmail("tester@vvcoe.com");
                tester.setPassword(new BCryptPasswordEncoder().encode("firefly@123"));
                userRepository.save(tester);
                System.out.println("✅ Inserted default tester account: tester@vvcoe.com / firefly@123");
            }
        };
    }
}
