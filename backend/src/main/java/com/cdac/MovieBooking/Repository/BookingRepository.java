package com.cdac.MovieBooking.Repository;

import com.cdac.MovieBooking.Entities.Booking;
import com.cdac.MovieBooking.Entities.Enums.BookingStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;
import java.math.BigDecimal;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
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

    Optional<Booking> findByRazorpayOrderId(String razorpayOrderId);

    List<Booking> findByBookingStatus(BookingStatus bookingStatus);

    @Query("SELECT SUM(b.totalAmount) FROM Booking b JOIN b.show s JOIN s.screen sc JOIN sc.theatre t JOIN t.owner o WHERE o.userId = :ownerId AND b.bookingStatus = 'CONFIRMED'")
    BigDecimal calculateTotalRevenueByOwner(@Param("ownerId") Long ownerId);

    @Query("SELECT COUNT(b) FROM Booking b JOIN b.show s JOIN s.screen sc JOIN sc.theatre t JOIN t.owner o WHERE o.userId = :ownerId AND b.bookingStatus = 'CONFIRMED'")
    Long countTicketsSoldByOwner(@Param("ownerId") Long ownerId);

    // Theatre Specific

    @Query("SELECT SUM(b.totalAmount) FROM Booking b JOIN b.show s JOIN s.screen sc WHERE sc.theatre.theatreId = :theatreId AND b.bookingStatus = 'CONFIRMED'")
    BigDecimal calculateTotalRevenueByTheatre(@Param("theatreId") Long theatreId);

    @Query("SELECT COUNT(b) FROM Booking b JOIN b.show s JOIN s.screen sc WHERE sc.theatre.theatreId = :theatreId AND b.bookingStatus = 'CONFIRMED'")
    Long countTicketsSoldByTheatre(@Param("theatreId") Long theatreId);

    @Query("SELECT DISTINCT b FROM Booking b JOIN FETCH b.show s JOIN FETCH s.movie JOIN FETCH b.user WHERE s.screen.theatre.theatreId = :theatreId ORDER BY b.bookingTime DESC")
    List<Booking> findBookingsByTheatre(@Param("theatreId") Long theatreId);

}
