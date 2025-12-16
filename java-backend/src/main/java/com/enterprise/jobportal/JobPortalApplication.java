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

    // 1. SECURITY CONFIGURATION (CORS)
    // Allows your React Frontend (port 5173) to access this Java Backend (port 8080)
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.cors(cors -> cors.configure(http))
            .csrf(csrf -> csrf.disable()) // Disabled for development simplicity
            .authorizeHttpRequests(auth -> auth.anyRequest().permitAll());
        return http.build();
    }

    // 2. DATABASE SEEDING
    // Pre-loads sample data so the app isn't empty on first run
    @Bean
    CommandLineRunner initDatabase(JobRepository jobRepo, UserRepository userRepo) {
        return args -> {
            if (jobRepo.count() == 0) {
                // Pre-create some Unstop-style opportunities
                jobRepo.save(new Job("CodeWars 2025", "Microsoft", "$15,000 Prize", "Online", "Hackathon", List.of("C++", "Algorithms")));
                jobRepo.save(new Job("Product Design Challenge", "Uber", "Internship Offer", "Hybrid", "Case Challenge", List.of("Figma", "Product Mgmt")));
                jobRepo.save(new Job("Backend Engineer", "Amazon", "$45k/yr", "Bangalore", "Job", List.of("Java", "AWS", "DynamoDB")));
                System.out.println("--- Database Initialized with Sample Opportunities ---");
            }
        };
    }
}

// --- ENTITIES (Database Tables) ---

@Entity
@Table(name = "users")
class User {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(unique = true)
    private String email;
    private String password; // In production, use BCrypt hashing!
    private String firstName;
    private String lastName;
    private String role; // "participant" or "organizer"

    public User() {}
    public User(String email, String password, String firstName, String lastName, String role) {
        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.role = role;
    }

    // Getters for JSON response
    public Long getId() { return id; }
    public String getEmail() { return email; }
    public String getFirstName() { return firstName; }
    public String getLastName() { return lastName; }
    public String getRole() { return role; }
    public String getPassword() { return password; }
}

@Entity
@Table(name = "jobs")
class Job {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String company;
    private String salary; // Used for "Prize/CTC" in UI
    private String location; // Used for "Mode" (Online/Offline)
    private String type; // "Hackathon", "Job", "Internship"
    
    @ElementCollection
    private List<String> skills; // Tags

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

// --- REPOSITORIES (Data Access Layer) ---

interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
}

interface JobRepository extends JpaRepository<Job, Long> {}

// --- CONTROLLERS (API Endpoints) ---

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173") // Explicitly allow Frontend origin
class MainController {

    @Autowired private UserRepository userRepository;
    @Autowired private JobRepository jobRepository;

    // --- AUTHENTICATION ---

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
            body.getOrDefault("role", "participant")
        );
        userRepository.save(newUser);
        return ResponseEntity.ok(Map.of("message", "Registration successful"));
    }

    @PostMapping("/auth/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> creds) {
        String email = creds.get("email");
        String password = creds.get("password");

        // 1. Database Auth
        if (email != null && password != null) {
            Optional<User> userOpt = userRepository.findByEmail(email);
            if (userOpt.isPresent() && userOpt.get().getPassword().equals(password)) {
                User user = userOpt.get();
                return ResponseEntity.ok(Map.of(
                    "token", "jwt-fake-token-" + user.getId(),
                    "name", user.getFirstName() + " " + user.getLastName(),
                    "role", user.getRole(),
                    "firstName", user.getFirstName()
                ));
            }
            return ResponseEntity.status(401).body(Map.of("error", "Invalid credentials"));
        }

        // 2. Demo/Quick Login Fallback (For button clicks without email)
        String role = creds.getOrDefault("role", "participant");
        return ResponseEntity.ok(Map.of(
            "token", "demo-token",
            "name", role.equals("organizer") ? "TechCorp Admin" : "Demo Student",
            "role", role,
            "firstName", "Demo"
        ));
    }

    // --- OPPORTUNITIES / JOBS ---

    @GetMapping("/jobs")
    public List<Job> getJobs() {
        return jobRepository.findAll();
    }

    @PostMapping("/jobs")
    public Job postJob(@RequestBody Job newJob) {
        return jobRepository.save(newJob);
    }
}