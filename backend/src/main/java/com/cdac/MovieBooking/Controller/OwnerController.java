package com.cdac.MovieBooking.Controller;

import com.cdac.MovieBooking.Dtos.Request.AddScreenRequestDTO;
import com.cdac.MovieBooking.Dtos.Request.AddTheatereRequestDTO;
import com.cdac.MovieBooking.Dtos.Request.SeatRequestDTO;
import com.cdac.MovieBooking.Dtos.Response.ApiResponse;
import com.cdac.MovieBooking.Dtos.Response.SeatResponseDTO;
import com.cdac.MovieBooking.Entities.Screen;
import com.cdac.MovieBooking.Entities.Theatre;
import com.cdac.MovieBooking.Entities.User;
import com.cdac.MovieBooking.Repository.UserRepository;
import com.cdac.MovieBooking.Security.CustomUserDetails;
import com.cdac.MovieBooking.Service.OwnerService;
import com.cdac.MovieBooking.Service.SeatService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/owner") 
@RequiredArgsConstructor
public class OwnerController {

    private final OwnerService ownerService;
    private final UserRepository userRepository;

    //Helper method to get logged in users
    private Long getLoggedInUserId(Principal principal) {
        String email = principal.getName(); // In JWT, the 'subject' is usually the email/username
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Logged in user not found in DB!"));
        return user.getUserId();
    }

    @PostMapping("/add-theatre")
    public ResponseEntity<ApiResponse<Theatre>>
    addTheatre(@Valid @RequestBody AddTheatereRequestDTO request)
    {
        //1 get logged-in in Owner's ID from his Token
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        CustomUserDetails userDetails = (CustomUserDetails) auth.getPrincipal();
        Long ownerId = userDetails.getUserId();

        //2 Calling Service to save Data
        Theatre savedTheatre =ownerService.addTheatre(request,ownerId);

        //3.return Success responce
        return  ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Theatre added successfullu!!",savedTheatre));

    }

    //Add screens API
    @PostMapping("/add-screen")
    public ResponseEntity<Screen> addScreen(@RequestBody @Valid AddScreenRequestDTO request, Principal principal) {
        Long ownerId = getLoggedInUserId(principal);
        Screen screen = ownerService.addScreen(request, ownerId);
        return ResponseEntity.ok(screen);
    }



    private final SeatService seatService;

    @PostMapping("/screens/{screenId}/seats")
    public ResponseEntity<ApiResponse<List<SeatResponseDTO>>> createSeats(
            @PathVariable Long screenId,
            @RequestBody List<SeatRequestDTO> seatRequestDTOs) {

        List<SeatResponseDTO> seats = seatService.createSeats(screenId, seatRequestDTOs);

        return ResponseEntity.ok(
                ApiResponse.success("Seats created successfully", seats)
        );
    }




}
