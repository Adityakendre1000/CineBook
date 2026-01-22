package com.cdac.MovieBooking.Service;

import com.cdac.MovieBooking.Dtos.Response.UserResponseDto;

public interface UserService {

    UserResponseDto getUserByEmail(String userEmail);
}
