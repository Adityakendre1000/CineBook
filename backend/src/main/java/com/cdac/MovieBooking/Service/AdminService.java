package com.cdac.MovieBooking.Service;

import com.cdac.MovieBooking.Dtos.Request.MovieDTO;
import com.cdac.MovieBooking.Dtos.Response.AdminDashboardStatsDTO;
import com.cdac.MovieBooking.Entities.Movie;
import com.cdac.MovieBooking.Entities.Theatre;
import com.cdac.MovieBooking.Entities.User;

import java.util.List;

public interface AdminService {
    AdminDashboardStatsDTO getDashboardStats();

    List<User> getAllUsers();

    User updateUserStatus(Long userId);

    List<Movie> getAllMovies();

    Movie addMovie(MovieDTO movieDTO);

    Movie updateMovie(Long id, MovieDTO movieDTO);

    Movie updateMovieStatus(Long id);

    List<Theatre> getPendingTheatres();

    Theatre approveTheatre(Long theatreId, boolean isApproved);
}
