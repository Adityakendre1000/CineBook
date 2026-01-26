package com.cdac.MovieBooking.Repository;

import com.cdac.MovieBooking.Entities.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking,Long> {
    @Query("""
        SELECT DISTINCT b FROM Booking b
        JOIN FETCH b.show s
        JOIN FETCH s.movie
        JOIN FETCH s.screen sc
        JOIN FETCH sc.theatre
        LEFT JOIN FETCH b.user
        WHERE b.user.userId = :userId
    """)
    List<Booking> findAllBookingsByUserId(@Param("userId") Long userId);
}
