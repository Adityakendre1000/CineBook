package com.cdac.MovieBooking.Dtos.Request;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.Data;

@Data
public class MovieFeedbackRequest {

    @Min(1)
    @Max(5)
    private int rating;

    private String review;
}
