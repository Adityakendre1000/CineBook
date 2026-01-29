package com.cdac.MovieBooking.Dtos.Response;

import com.cdac.MovieBooking.Entities.Enums.Gender;
import com.cdac.MovieBooking.Entities.Enums.UserRole;
import com.cdac.MovieBooking.Entities.Enums.UserStatus;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserResponseDto {

    private String firstName;

    private String lastName;

    private String email;

    private Gender gender;

    private LocalDate dob;

    private String mobileNo;

    private LocalDateTime createdAt;

    private UserRole userRole;

    private UserStatus userStatus;
}
