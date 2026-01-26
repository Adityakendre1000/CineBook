package com.cdac.MovieBooking.Controller;

import com.cdac.MovieBooking.Dtos.Request.AddTheatereRequestDTO;
import com.cdac.MovieBooking.Dtos.Response.ApiResponse;
import com.cdac.MovieBooking.Entities.Theatre;
import com.cdac.MovieBooking.Security.CustomUserDetails;
import com.cdac.MovieBooking.Service.OwnerService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/owner") 
@RequiredArgsConstructor
public class OwnerController {

    private final OwnerService ownerService;

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

}
