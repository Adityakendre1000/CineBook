package com.cdac.MovieBooking.Entities.Dtos;

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
            String firstName;
            String lastName;
            String email ;
            Gender gender;
            LocalDate dob;
            String mobileNo;
            UserRole userRole;
            UserStatus userStatus;
}
