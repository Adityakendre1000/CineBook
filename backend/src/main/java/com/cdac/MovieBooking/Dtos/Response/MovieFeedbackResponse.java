package com.cdac.MovieBooking.Dtos.Response;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class MovieFeedbackResponse {
    private Long feedbackId;
    private int rating;
    private String review;
    private String userName;
    private LocalDateTime createdAt;
}
