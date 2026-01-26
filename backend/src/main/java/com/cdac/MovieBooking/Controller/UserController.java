package com.cdac.MovieBooking.Controller;

import com.cdac.MovieBooking.Dtos.Response.ApiResponse;
import com.cdac.MovieBooking.Dtos.Response.UserResponseDto;
import com.cdac.MovieBooking.Service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
public class UserController {

    private final UserService us;

    // get user details by email
    @GetMapping("/by-email")
    public ResponseEntity<ApiResponse<UserResponseDto>> getUserByEmail(
            @RequestParam String userEmail) {

        UserResponseDto user = us.getUserByEmail(userEmail);

        return ResponseEntity
                .status(HttpStatus.FOUND)
                .body(ApiResponse.success("User fetched successfully", user));
    }


    //get current user details
    public ResponseEntity<ApiResponse<UserResponseDto>> getUser()
}
