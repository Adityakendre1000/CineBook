package com.cdac.MovieBooking.Controller;

import com.cdac.MovieBooking.Dtos.Request.BookingInitiateRequest;
import com.cdac.MovieBooking.Dtos.Response.ApiResponse;
import com.cdac.MovieBooking.Dtos.Response.RazorpayOrderResponse;
import com.cdac.MovieBooking.Entities.User;
import com.cdac.MovieBooking.Security.CustomUserDetails;
import com.cdac.MovieBooking.Service.BookingService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/user/booking")
@RequiredArgsConstructor
public class BookingController {

    private final BookingService bookingService;

    @PostMapping("/initiate")
    public ResponseEntity<ApiResponse<RazorpayOrderResponse>> initiateBooking(@RequestBody BookingInitiateRequest request, Authentication authentication) {

        log.info("ShowId: {}", request.getShowId());
        log.info("SeatIds: {}", request.getShowSeatIds());

        CustomUserDetails userDetails =
                (CustomUserDetails) authentication.getPrincipal();

        User user = new User();
        user.setUserId(userDetails.getUserId());

        RazorpayOrderResponse response =
                bookingService.initiateBooking(user, request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(ApiResponse.success(
                        "Booking initiated successfully",
                        response
                ));
    }
}
