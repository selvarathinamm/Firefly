package com.vvfirefly.backend;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class VvfireflyBackendApplication {

    public static void main(String[] args) {
        // Load environment variables
        Dotenv dotenv = Dotenv.load();
        System.setProperty("SPRING_DATASOURCE_URL", dotenv.get("SPRING_DATASOURCE_URL"));
        System.setProperty("SPRING_DATASOURCE_USERNAME", dotenv.get("SPRING_DATASOURCE_USERNAME"));
        System.setProperty("SPRING_DATASOURCE_PASSWORD", dotenv.get("SPRING_DATASOURCE_PASSWORD"));
        System.setProperty("SPRING_JWT_SECRET", dotenv.get("SPRING_JWT_SECRET"));

        SpringApplication.run(VvfireflyBackendApplication.class, args);
    }
}
