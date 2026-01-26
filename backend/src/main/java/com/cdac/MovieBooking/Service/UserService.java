package com.cdac.MovieBooking.Service;

import com.cdac.MovieBooking.Dtos.Request.UserUpdateRequest;
import com.cdac.MovieBooking.Dtos.Response.UserResponseDto;

public interface UserService {

    UserResponseDto getUserByEmail(String userEmail);

    UserResponseDto getUserById(Long userId);

    UserUpdateRequest updateUserDetails(UserUpdateRequest userUpdateRequest, Long userId);
}
