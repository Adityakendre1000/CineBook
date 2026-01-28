package com.cdac.MovieBooking.Repository;

import com.cdac.MovieBooking.Entities.Show;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ShowRepository extends JpaRepository<Show, Long> {

    List<Show> findByMovie_MovieId(Long movieId);

    List<Show> findByScreen_Theatre_TheatreId(Long theatreId);

    @org.springframework.data.jpa.repository.Query("SELECT COUNT(s) FROM Show s WHERE s.screen.theatre.theatreId = :theatreId AND s.showStatus = 'ACTIVE'")
    Long countActiveShowsByTheatre(@org.springframework.data.repository.query.Param("theatreId") Long theatreId);
}
