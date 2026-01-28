package com.cdac.MovieBooking.Controller;

import com.cdac.MovieBooking.Dtos.Request.MovieFeedbackRequest;
import com.cdac.MovieBooking.Dtos.Response.ApiResponse;
import com.cdac.MovieBooking.Service.MovieFeedbackService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/movies")
@RequiredArgsConstructor
public class MovieFeedbackController {

    private final MovieFeedbackService feedbackService;

    @PostMapping("/{movieId}/feedback")
    public ResponseEntity<ApiResponse> submitFeedback(
            @PathVariable Long movieId,
            @RequestBody @Valid MovieFeedbackRequest request,
            Authentication authentication
    ) {
        feedbackService.submitFeedback(
                movieId,
                request,
                authentication.getName()
        );

        return ResponseEntity.ok(
                new ApiResponse(
                        true,
                        "Feedback submitted successfully",
                        null,
                        "OK"
                )
        );
    }
}
