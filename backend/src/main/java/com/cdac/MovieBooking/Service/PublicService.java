package com.cdac.MovieBooking.Service;

import com.cdac.MovieBooking.Dtos.Response.ShowResponseDTO;
import com.cdac.MovieBooking.Dtos.Response.TheatreResponseDTO;
import com.cdac.MovieBooking.Entities.Movie;

import java.util.List;

public interface PublicService {

    // Movies

    List<Movie> getAllMovies();

    Movie getMovieById(Long id);

    String getMovieCast(Long movieId);

    // Theatres

    List<TheatreResponseDTO> getAllTheatres();

    // Shows
    List<ShowResponseDTO> getShowsByMovie(Long movieId);

    // Seats
    com.cdac.MovieBooking.Dtos.Response.SeatLayoutResponseDTO getSeatsForShow(Long showId);
}
