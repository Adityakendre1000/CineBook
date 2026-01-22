package com.cdac.MovieBooking.Dtos.Request;

import com.cdac.MovieBooking.Entities.Enums.Gender;
import com.cdac.MovieBooking.Entities.Enums.UserRole;
import jakarta.validation.constraints.*;
import lombok.Data;

import java.time.LocalDate;

@Data
public class RegisterRequest {

    @NotBlank(message = "First name cannot be empty")
    private String firstName;

    @NotBlank(message = "Last name cannot be empty")
    private String lastName;

    @Email(message = "Please enter a valid email address")
    @NotBlank(message = "Email is required")
    private String email;

    @NotBlank(message = "Password is required")
    @Size(min = 6, message = "Password must be at least 6 characters long")
    private String password;

    @NotNull(message = "Gender must be selected")
    private Gender gender;

    @NotNull(message = "Date of birth is required")
    @Past(message = "Date of birth must be a past date")
    private LocalDate dob;

    @NotBlank(message = "Mobile number is required")
    @Pattern(
            regexp = "^\\d{10}$",
            message = "Mobile number must be exactly 10 digits"
    )
    private String mobileNo;

    @NotNull(message = "User role must be selected")
    private UserRole userRole;
}
