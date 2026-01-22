package com.cdac.MovieBooking.Controller;

import com.cdac.MovieBooking.Dtos.Response.UserResponseDto;
import com.cdac.MovieBooking.Service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
