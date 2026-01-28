package com.cdac.MovieBooking.Repository;


import com.cdac.MovieBooking.Entities.MovieFeedback;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MovieFeedbackRepository
        extends JpaRepository<MovieFeedback, Long> {

    boolean existsByMovie_MovieIdAndUser_UserId(Long movieId, Long userId);

    List<MovieFeedback> findByMovie_MovieId(Long movieId);
}
