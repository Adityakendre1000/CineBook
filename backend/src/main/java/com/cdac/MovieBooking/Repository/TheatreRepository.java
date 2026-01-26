package com.cdac.MovieBooking.Repository;

import com.cdac.MovieBooking.Entities.Theatre;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface TheatreRepository extends JpaRepository<Theatre,Long> {
    // List to fetch the theaters owned by the theater owner
    List<Theatre> findByOwner_UserId(Long ownerId);
}
