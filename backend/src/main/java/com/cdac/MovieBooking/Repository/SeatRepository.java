package com.cdac.MovieBooking.Repository;

import com.cdac.MovieBooking.Entities.Screen;
import com.cdac.MovieBooking.Entities.Seat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SeatRepository extends JpaRepository<Seat,Long> {
    List<Seat> findByScreen(Screen screen);
}
