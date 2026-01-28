package com.cdac.MovieBooking.Service;


import com.cdac.MovieBooking.Dtos.Request.MovieFeedbackRequest;
import com.cdac.MovieBooking.Entities.Movie;
import com.cdac.MovieBooking.Entities.MovieFeedback;
import com.cdac.MovieBooking.Entities.User;
import com.cdac.MovieBooking.Repository.MovieFeedbackRepository;
import com.cdac.MovieBooking.Repository.MovieRepository;
import com.cdac.MovieBooking.Repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class MovieFeedbackServiceImpl implements MovieFeedbackService {

    private final MovieRepository movieRepository;
    private final UserRepository userRepository;
    private final MovieFeedbackRepository feedbackRepository;

    @Override
    public void submitFeedback(
            Long movieId,
            MovieFeedbackRequest request,
            String username
    ) {
        Movie movie = movieRepository.findById(movieId)
                .orElseThrow(() -> new RuntimeException("Movie not found"));

        User user = userRepository.findByEmail(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (feedbackRepository.existsByMovie_MovieIdAndUser_UserId(
                movieId, user.getUserId())) {
            throw new RuntimeException("You have already reviewed this movie");
        }

        MovieFeedback feedback = MovieFeedback.builder()
                .movie(movie)
                .user(user)
                .rating(request.getRating())
                .review(request.getReview())
                .createdAt(LocalDateTime.now())
                .build();

        feedbackRepository.save(feedback);
    }
}
