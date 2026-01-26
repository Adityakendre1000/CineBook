package com.cdac.MovieBooking.Repository;

import com.cdac.MovieBooking.Entities.Show;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ShowRepository extends JpaRepository<Show, Long> {

    List<Show> findByMovie_MovieId(Long movieId);
}
