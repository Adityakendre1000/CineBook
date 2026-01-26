package com.cdac.MovieBooking.Dtos.Response;

import com.cdac.MovieBooking.Entities.Enums.Gender;
import com.cdac.MovieBooking.Entities.Enums.UserRole;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class UserResponse {

    private Long userId;
    private String firstName;
    private String lastName;
    private String email;
    private Gender gender;
    private UserRole role;
}

