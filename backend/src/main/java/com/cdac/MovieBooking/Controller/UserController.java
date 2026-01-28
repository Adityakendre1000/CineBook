package com.cdac.MovieBooking.Controller;

import com.cdac.MovieBooking.Dtos.Request.PaymentFailureRequest;
import com.cdac.MovieBooking.Dtos.Request.PaymentVerifyRequest;
import com.cdac.MovieBooking.Dtos.Request.UserUpdateRequest;
import com.cdac.MovieBooking.Dtos.Response.ApiResponse;
import com.cdac.MovieBooking.Dtos.Response.BookingResponse;
import com.cdac.MovieBooking.Dtos.Response.UserResponseDto;
import com.cdac.MovieBooking.Security.CustomUserDetails;
import com.cdac.MovieBooking.Service.PaymentService;
import com.cdac.MovieBooking.Service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
public class UserController {

    private final UserService us;
    private final PaymentService paymentService;

    // get user details by email
    @GetMapping("/by-email")
    public ResponseEntity<ApiResponse<UserResponseDto>> getUserByEmail(
            @RequestParam String userEmail) {

        UserResponseDto user = us.getUserByEmail(userEmail);

        return ResponseEntity
                .status(HttpStatus.FOUND)
                .body(ApiResponse.success("User fetched successfully", user));
    }

    // get current user details
    @GetMapping("/me")
    public ResponseEntity<ApiResponse<UserResponseDto>> getUser(Authentication authentication) {
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
        Long userId = null;
        if (userDetails != null) {
            userId = userDetails.getUserId();
        }

        UserResponseDto user = us.getUserById(userId);

        return ResponseEntity
                .status(HttpStatus.FOUND)
                .body(ApiResponse.success("User Details fetched", user));

    }

    // update user
    @PutMapping("/update-user")
    public ResponseEntity<ApiResponse<UserUpdateRequest>> updateUser(@RequestBody UserUpdateRequest userUpdateRequest,
            Authentication authentication) {
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
        Long userId = null;
        if (userDetails != null) {
            userId = userDetails.getUserId();
        }

        UserUpdateRequest user = us.updateUserDetails(userUpdateRequest, userId);

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(ApiResponse.success("User Details updated successfully", user));
    }

    // see all movie bookings for a user
    @GetMapping("/bookings")
    public ResponseEntity<ApiResponse<List<BookingResponse>>> getBookings(Authentication authentication) {
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
        Long userId = null;
        if (userDetails != null) {
            userId = userDetails.getUserId();
        }

        List<BookingResponse> bookings = us.getBookings(userId);

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(ApiResponse.success("Bookings fetched successfully", bookings));
    }

    @GetMapping("/bookings/{bookingId}")
    public ResponseEntity<ApiResponse<BookingResponse>> getBookingById(
            @PathVariable Long bookingId,
            Authentication authentication
    ) {
        CustomUserDetails userDetails =
                (CustomUserDetails) authentication.getPrincipal();

        BookingResponse booking =
                us.getBookingById(bookingId, userDetails.getUserId());

        return ResponseEntity.ok(
                ApiResponse.success("Booking fetched successfully", booking)
        );
    }

    @PostMapping("/payments/verify")
    public ResponseEntity<ApiResponse<String>> verifyPayment(@RequestBody PaymentVerifyRequest request, Authentication authentication) {
        CustomUserDetails userDetails =
                (CustomUserDetails) authentication.getPrincipal();

        Long userId = userDetails.getUserId();

        paymentService.verifyPayment(request, userId);

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(ApiResponse.success(
                        "Payment verified successfully",
                        "BOOKING_CONFIRMED"
                ));
    }


    @PostMapping("/payments/failure")
    public ResponseEntity<ApiResponse<String>> paymentFailure(@RequestBody PaymentFailureRequest request, Authentication authentication) {
        CustomUserDetails userDetails =
                (CustomUserDetails) authentication.getPrincipal();

        paymentService.handlePaymentFailure(
                request,
                userDetails.getUserId()
        );

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(ApiResponse.success(
                        "Payment failed, seats released",
                        "BOOKING_CANCELLED"
                ));
    }


}
