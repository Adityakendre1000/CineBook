package com.cdac.MovieBooking.Repository;

import com.cdac.MovieBooking.Entities.Dtos.UserResponseDto;
import com.cdac.MovieBooking.Entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepo extends JpaRepository<User,Long> {

    Optional<User> findByEmail(String userEmail);
}
