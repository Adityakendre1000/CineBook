package com.cdac.MovieBooking.Repository;

import com.cdac.MovieBooking.Entities.Screen;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ScreenRepository extends JpaRepository<Screen, Long> {

    Optional<Screen> findByTheatre_TheatreIdAndScreenNumber(Long theatreId, int screenNumber);

    @Query("SELECT MAX(s.screenNumber) FROM Screen s WHERE s.theatre.theatreId = :theatreId")
    Integer findMaxScreenNumber(@Param("theatreId") Long theatreId);
}
