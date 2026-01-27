package com.cdac.MovieBooking.Repository;

import com.cdac.MovieBooking.Entities.ShowSeat;
import jakarta.persistence.LockModeType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ShowSeatRepository extends JpaRepository<ShowSeat,Long> {
    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("""
    SELECT ss FROM ShowSeat ss
    WHERE ss.show.showId = :showId
    AND ss.showSeatId IN :showSeatIds
""")
    List<ShowSeat> lockSeats(
            @Param("showId") Long showId,
            @Param("showSeatIds") List<Long> showSeatIds
    );


    @Query("""
    SELECT ss FROM ShowSeat ss
    WHERE ss.showSeatStatus = 'LOCKED'
    AND ss.lockTime < :expiry
""")
    List<ShowSeat> findExpiredLockedSeats(
            @Param("expiry") LocalDateTime expiry
    );
}
