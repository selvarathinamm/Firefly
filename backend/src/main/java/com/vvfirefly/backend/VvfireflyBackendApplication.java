package com.vvfirefly.backend;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class VvfireflyBackendApplication {

    public static void main(String[] args) {
        // Load environment variables from .env when present (harmless if absent)
        try {
            Dotenv dotenv = Dotenv.configure().ignoreIfMissing().load();

            String dbUrl = dotenv.get("SPRING_DATASOURCE_URL");
            String dbUser = dotenv.get("SPRING_DATASOURCE_USERNAME");
            String dbPass = dotenv.get("SPRING_DATASOURCE_PASSWORD");
            String jwtSecret = dotenv.get("SPRING_JWT_SECRET");

            if (dbUrl != null) System.setProperty("SPRING_DATASOURCE_URL", dbUrl);
            if (dbUser != null) System.setProperty("SPRING_DATASOURCE_USERNAME", dbUser);
            if (dbPass != null) System.setProperty("SPRING_DATASOURCE_PASSWORD", dbPass);
            if (jwtSecret != null) System.setProperty("SPRING_JWT_SECRET", jwtSecret);
        } catch (Exception ignored) {
            // ignore dotenv failures so application can rely on other configuration sources
        }

        SpringApplication.run(VvfireflyBackendApplication.class, args);
    }
}