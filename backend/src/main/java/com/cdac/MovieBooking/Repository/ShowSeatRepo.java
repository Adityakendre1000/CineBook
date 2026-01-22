package com.cdac.MovieBooking.Repository;

import com.cdac.MovieBooking.Entities.ShowSeat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ShowSeatRepo extends JpaRepository<ShowSeat,Long> {
}
