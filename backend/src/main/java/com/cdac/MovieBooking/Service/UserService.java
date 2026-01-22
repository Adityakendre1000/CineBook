package com.cdac.MovieBooking.Service;

import com.cdac.MovieBooking.Entities.Dtos.UserResponseDto;
import com.cdac.MovieBooking.Entities.User;
import jakarta.validation.Valid;

import java.util.List;

public interface UserService {

    UserResponseDto getUserByEmail(String userEmail);
}
