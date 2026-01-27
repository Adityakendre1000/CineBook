package com.cdac.MovieBooking.Service;

import com.cdac.MovieBooking.Dtos.Request.UserUpdateRequest;
import com.cdac.MovieBooking.Dtos.Response.BookingResponse;
import com.cdac.MovieBooking.Dtos.Response.UserResponseDto;
import com.cdac.MovieBooking.Entities.User;
import com.cdac.MovieBooking.Exception.ResourceNotFoundException;
import com.cdac.MovieBooking.Repository.BookingRepository;
import com.cdac.MovieBooking.Repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository ur;
    private final ModelMapper modelMapper;
    private final BookingRepository br;

    @Override
    public UserResponseDto getUserByEmail(String userEmail) {
        User user = ur.findByEmail(userEmail)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "User not found with email: " + userEmail
                        ));

        return modelMapper.map(user, UserResponseDto.class);
    }

    @Override
    public UserResponseDto getUserById(Long userId) {
        User user = ur.findById(userId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "User not found with id: " + userId
                        ));

        return modelMapper.map(user, UserResponseDto.class);
    }

    @Override
    public UserUpdateRequest updateUserDetails(UserUpdateRequest userUpdateRequest, Long userId) {
        User user = ur.findById(userId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "User not found with id: " + userId
                        ));

        user.setFirstName(userUpdateRequest.getFirstName());
        user.setLastName(userUpdateRequest.getLastName());
        user.setEmail(userUpdateRequest.getEmail());
        user.setGender(userUpdateRequest.getGender());
        user.setDob(userUpdateRequest.getDob());
        user.setMobileNo(userUpdateRequest.getMobileNo());

        ur.save(user);

        return modelMapper.map(user, UserUpdateRequest.class);
    }

    @Override
    public List<BookingResponse> getBookings(Long userId) {

        // validate user exists
        ur.findById(userId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "User not found with id: " + userId
                        ));

        return br.findAllBookingsByUserId(userId)
                .stream()
                .map(booking -> BookingResponse.builder()
                        .bookingId(booking.getBookingId())
                        .bookingStatus(booking.getBookingStatus())
                        .bookingTime(booking.getBookingTime())
                        .totalAmount(booking.getTotalAmount())

                        .showId(booking.getShow().getShowId())
                        .showTime(booking.getShow().getShowTime())
                        .showPrice(booking.getShow().getPrice())

                        .movieId(booking.getShow().getMovie().getMovieId())
                        .movieTitle(booking.getShow().getMovie().getTitle())
                        .language(booking.getShow().getMovie().getLanguage())
                        .genre(booking.getShow().getMovie().getGenre())
                        .durationMinutes(booking.getShow().getMovie().getDurationMinutes())
                        .posterUrl(booking.getShow().getMovie().getPosterUrl())

                        .theatreId(booking.getShow().getScreen().getTheatre().getTheatreId())
                        .theatreName(booking.getShow().getScreen().getTheatre().getTheatreName())
                        .screenNumber(booking.getShow().getScreen().getScreenNumber())

                        .build())
                .toList();
    }
}
