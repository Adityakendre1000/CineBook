package com.cdac.MovieBooking.Controller;

import com.cdac.MovieBooking.Entities.Booking;
import com.cdac.MovieBooking.Entities.Dtos.UserResponseDto;
import com.cdac.MovieBooking.Entities.User;
import com.cdac.MovieBooking.Service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
public class UserController {

    private final UserService us;

    //get user details by email
    @GetMapping("/by-email")
    ResponseEntity<UserResponseDto> getUserByEmail(@RequestParam String userEmail){
        return ResponseEntity.ok(us.getUserByEmail(userEmail));
//        return ResponseEntity.ok("Hello"+userEmail);
    }
}
