package com.cdac.MovieBooking.Service;

import com.cdac.MovieBooking.Dtos.Response.ShowResponseDTO;
import com.cdac.MovieBooking.Entities.Theatre;
import com.cdac.MovieBooking.Dtos.Response.TheatreResponseDTO;
import com.cdac.MovieBooking.Entities.Movie;
import com.cdac.MovieBooking.Exception.MovieNotFoundException;
import com.cdac.MovieBooking.Repository.MovieRepository;
import com.cdac.MovieBooking.Repository.ShowRepository;
import com.cdac.MovieBooking.Repository.TheatreRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PublicService {

    private final MovieRepository movieRepository;

    public List<Movie> getAllMovies() {
        return movieRepository.findAll();
    }

    public Movie getMovieById(Long id) {
        return movieRepository.findById(id)
                .orElseThrow(() -> new MovieNotFoundException("Movie not found with id " + id));

    }



    public String getMovieCast(Long movieId) {
        Movie movie = movieRepository.findById(movieId)
                .orElseThrow(() ->
                        new MovieNotFoundException("Movie not found with id " + movieId)
                );

        return movie.getCast();
    }





    private final TheatreRepository theatreRepository;

    public List<TheatreResponseDTO> getAllTheatres() {

        return theatreRepository.findAll()
                .stream()
                .map(theatre -> TheatreResponseDTO.builder()
                        .theatreId(theatre.getTheatreId())
                        .theatreName(theatre.getTheatreName())
                        .location(theatre.getLocation())
                        .theatreStatus(theatre.getTheatreStatus())
                        .theatreApprovalStatus(theatre.getTheatreApprovalStatus())
                        .build())
                .toList();
    }


    private final ShowRepository showRepository;


    public List<ShowResponseDTO> getShowsByMovie(Long movieId) {

        return showRepository.findByMovie_MovieId(movieId)
                .stream()
                .map(show -> ShowResponseDTO.builder()
                        .showId(show.getShowId())
                        .showTime(show.getShowTime())
                        .price(show.getPrice())
                        .screenId(show.getScreen().getScreenId())
                        .theatreName(show.getScreen().getTheatre().getTheatreName())
                        .location(show.getScreen().getTheatre().getLocation())
                        .build())
                .toList();
    }

}
