package com.cdac.MovieBooking.Repository;

import com.cdac.MovieBooking.Entities.Booking;
import com.cdac.MovieBooking.Entities.BookingSeat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookingSeatRepository extends JpaRepository<BookingSeat, Long> {
    List<BookingSeat> findByBooking(Booking booking);

    List<BookingSeat> findByBookingIn(List<Booking> bookings);
}
