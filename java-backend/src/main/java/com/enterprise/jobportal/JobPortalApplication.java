package com.enterprise.jobportal;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.bind.annotation.*;
import jakarta.persistence.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import java.util.*;

@SpringBootApplication
public class JobPortalApplication {

    public static void main(String[] args) {
        SpringApplication.run(JobPortalApplication.class, args);
    }

    // 1. SECURITY: Allow React
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.cors(cors -> cors.configure(http))
            .csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(auth -> auth.anyRequest().permitAll());
        return http.build();
    }

    // 2. DATABASE INIT: Pre-load Jobs and a Test User
    @Bean
    CommandLineRunner initDatabase(JobRepository jobRepo, UserRepository userRepo) {
        return args -> {
            // Seed Jobs if empty
            if (jobRepo.count() == 0) {
                jobRepo.save(new Job("Senior Java Dev", "TechCorp", "$140k", "New York", "Full-time", List.of("Java", "Spring", "Microservices")));
                jobRepo.save(new Job("Python ML Engineer", "DataAI", "$130k", "Remote", "Contract", List.of("Python", "TensorFlow", "FastAPI")));
            }
            
            // Seed Admin/Test User if empty
            if (userRepo.findByEmail("admin@test.com").isEmpty()) {
                userRepo.save(new User("admin@test.com", "password", "Admin", "User", "admin"));
                System.out.println("--- Database Initialized with Jobs & Admin User ---");
            }
        };
    }
}

// --- ENTITIES (Database Tables) ---

@Entity
class Job {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String company;
    private String salary;
    private String location;
    private String type;
    @ElementCollection
    private List<String> skills;

    public Job() {}
    public Job(String title, String company, String salary, String location, String type, List<String> skills) {
        this.title = title;
        this.company = company;
        this.salary = salary;
        this.location = location;
        this.type = type;
        this.skills = skills;
    }
    // Getters
    public Long getId() { return id; }
    public String getTitle() { return title; }
    public String getCompany() { return company; }
    public String getSalary() { return salary; }
    public String getLocation() { return location; }
    public String getType() { return type; }
    public List<String> getSkills() { return skills; }
}

@Entity
@Table(name = "users")
class User {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String email;
    private String password; // In production, hash this!
    private String firstName;
    private String lastName;
    private String role; // "candidate", "recruiter"

    public User() {}
    public User(String email, String password, String firstName, String lastName, String role) {
        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.role = role;
    }

    // Getters
    public Long getId() { return id; }
    public String getEmail() { return email; }
    public String getPassword() { return password; }
    public String getFirstName() { return firstName; }
    public String getLastName() { return lastName; }
    public String getRole() { return role; }
}

// --- REPOSITORIES ---

interface JobRepository extends JpaRepository<Job, Long> {}

interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
}

// --- CONTROLLERS ---

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
class MainController {

    @Autowired private JobRepository jobRepository;
    @Autowired private UserRepository userRepository;

    // --- AUTH endpoints ---

    @PostMapping("/auth/register")
    public ResponseEntity<?> register(@RequestBody Map<String, String> body) {
        if (userRepository.findByEmail(body.get("email")).isPresent()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Email already exists"));
        }
        User newUser = new User(
            body.get("email"),
            body.get("password"),
            body.get("firstName"),
            body.get("lastName"),
            body.get("role")
        );
        userRepository.save(newUser);
        return ResponseEntity.ok(Map.of("message", "User registered successfully"));
    }

    @PostMapping("/auth/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> creds) {
        String email = creds.get("email");
        String password = creds.get("password");

        // 1. Try Database Login (Priority)
        if (email != null && password != null) {
            Optional<User> userOpt = userRepository.findByEmail(email);
            if (userOpt.isPresent()) {
                User user = userOpt.get();
                if (user.getPassword().equals(password)) {
                    Map<String, Object> response = new HashMap<>();
                    response.put("token", "jwt-token-" + user.getId());
                    response.put("name", user.getFirstName() + " " + user.getLastName());
                    response.put("role", user.getRole());
                    return ResponseEntity.ok(response);
                }
            }
            return ResponseEntity.status(401).body(Map.of("error", "Invalid credentials"));
        }

        // 2. Demo Mode (Fallback for Quick Buttons)
        // If no email/pass provided, allow demo login based on role
        String role = creds.getOrDefault("role", "candidate");
        Map<String, Object> response = new HashMap<>();
        response.put("token", "demo-token");
        response.put("name", "Demo " + role.toUpperCase());
        response.put("role", role);
        return ResponseEntity.ok(response);
    }

    // --- JOB endpoints ---

    @GetMapping("/jobs")
    public List<Job> getAllJobs() {
        return jobRepository.findAll();
    }
    
    @PostMapping("/jobs")
    public Job postJob(@RequestBody Job newJob) {
        return jobRepository.save(newJob);
    }
}