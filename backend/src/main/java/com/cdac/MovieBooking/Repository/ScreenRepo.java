package com.cdac.MovieBooking.Repository;

import com.cdac.MovieBooking.Entities.Screen;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ScreenRepo extends JpaRepository<Screen,Long> {
}
