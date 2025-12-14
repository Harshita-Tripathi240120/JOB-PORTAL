package com.enterprise.jobportal;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.http.ResponseEntity;
import java.util.*;

@SpringBootApplication
public class JobPortalApplication {
    public static void main(String[] args) {
        SpringApplication.run(JobPortalApplication.class, args);
    }

    // SECURITY CONFIG: Allow React (Port 5173) to access this Java API
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .cors(cors -> cors.configure(http))
            .csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(auth -> auth.anyRequest().permitAll());
        return http.build();
    }
}

// --- CONTROLLERS ---

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173") // Allow access from Frontend
class MainController {

    // 1. Auth Endpoint
    @PostMapping("/auth/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> creds) {
        // Mocking real DB lookup
        Map<String, Object> user = new HashMap<>();
        user.put("token", "jwt-token-access-12345");
        user.put("name", "Enterprise User");
        
        // Return the role requested (or default to candidate)
        String role = creds.getOrDefault("role", "candidate");
        user.put("role", role);
        
        System.out.println("Login request received for role: " + role);
        return ResponseEntity.ok(user);
    }

    // 2. Jobs Endpoint
    @GetMapping("/jobs")
    public List<Map<String, Object>> getJobs() {
        // Serving data from Java Backend to React
        return List.of(
            Map.of(
                "id", 1, 
                "title", "Java Engineer (Backend)", 
                "company", "Spring Systems", 
                "matchScore", 98, 
                "salary", "$150k", 
                "location", "New York, NY",
                "type", "Full-time",
                "posted", "Just now",
                "skills", List.of("Java", "Spring Boot", "Microservices")
            ),
            Map.of(
                "id", 2, 
                "title", "Python ML Developer", 
                "company", "Data Corp", 
                "matchScore", 85, 
                "salary", "$130k", 
                "location", "Remote",
                "type", "Contract",
                "posted", "2 hours ago",
                "skills", List.of("Python", "TensorFlow", "FastAPI")
            )
        );
    }
}