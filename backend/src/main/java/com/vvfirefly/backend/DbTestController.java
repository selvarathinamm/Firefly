package com.vvfirefly.backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class DbTestController {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @GetMapping("/dbstatus")
    public String dbStatus() {
        try {
            // simple no-side-effect check
            Integer result = jdbcTemplate.queryForObject("SELECT 1", Integer.class);
            if (result != null && result == 1) {
                return "✅ Connected to PostgreSQL (Neon) successfully!";
            } else {
                return "⚠️ Unexpected DB response: " + result;
            }
        } catch (Exception e) {
            return "❌ Database connection failed: " + e.getMessage();
        }
    }
}
