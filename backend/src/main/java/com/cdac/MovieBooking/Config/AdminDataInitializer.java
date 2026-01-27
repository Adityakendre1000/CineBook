package com.cdac.MovieBooking.Config;


import com.cdac.MovieBooking.Entities.Enums.Gender;
import com.cdac.MovieBooking.Entities.Enums.UserRole;
import com.cdac.MovieBooking.Entities.Enums.UserStatus;
import com.cdac.MovieBooking.Entities.User;
import com.cdac.MovieBooking.Repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

@Component
@RequiredArgsConstructor
public class AdminDataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {

        String adminEmail = "admin@moviebooking.com";

        if (userRepository.existsByEmail(adminEmail)) {
            return; // admin already exists
        }

        User admin = User.builder()
                .firstName("System")
                .lastName("Admin")
                .email(adminEmail)
                .password(passwordEncoder.encode("Admin@123"))
                .gender(Gender.MALE)
                .dob(LocalDate.of(1990, 1, 1))
                .mobileNo("9999999999")
                .userRole(UserRole.ROLE_ADMIN)
                .userStatus(UserStatus.ACTIVE)
                .build();

        userRepository.save(admin);

        System.out.println("Default admin account created");
    }
}

