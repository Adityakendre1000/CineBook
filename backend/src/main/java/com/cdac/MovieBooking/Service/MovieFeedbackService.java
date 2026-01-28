package com.cdac.MovieBooking.Service;

import com.cdac.MovieBooking.Dtos.Request.MovieFeedbackRequest;

public interface MovieFeedbackService {

    void submitFeedback(
            Long movieId,
            MovieFeedbackRequest request,
            String username
    );
}
