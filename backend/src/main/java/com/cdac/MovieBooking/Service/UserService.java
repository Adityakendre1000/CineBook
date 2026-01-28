package com.cdac.MovieBooking.Service;

import com.cdac.MovieBooking.Dtos.Request.UserUpdateRequest;
import com.cdac.MovieBooking.Dtos.Response.BookingResponse;
import com.cdac.MovieBooking.Dtos.Response.UserResponseDto;

import java.util.List;

public interface UserService {

    UserResponseDto getUserByEmail(String userEmail);

    UserResponseDto getUserById(Long userId);

    UserUpdateRequest updateUserDetails(UserUpdateRequest userUpdateRequest, Long userId);

    List<BookingResponse> getBookings(Long userId);

    BookingResponse getBookingById(Long bookingId, Long userId);
}
