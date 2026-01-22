package com.cdac.MovieBooking.Dtos.Response;

import com.cdac.MovieBooking.Entities.Enums.Gender;
import com.cdac.MovieBooking.Entities.Enums.UserRole;
import com.cdac.MovieBooking.Entities.Enums.UserStatus;
import lombok.*;

import java.time.LocalDate;

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
