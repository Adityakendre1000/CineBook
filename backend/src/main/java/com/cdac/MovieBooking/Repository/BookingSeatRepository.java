package com.cdac.MovieBooking.Repository;

import com.cdac.MovieBooking.Entities.BookingSeat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookingSeatRepository extends JpaRepository<BookingSeat,Long> {
}
