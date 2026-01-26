package com.cdac.MovieBooking.Controller;

import com.cdac.MovieBooking.Entities.Movie;
import com.cdac.MovieBooking.Service.PublicService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/public")
@RequiredArgsConstructor
public class PublicController {

    private final PublicService publicService;

    // API 1: Get all movies
    @GetMapping("/movies")
    public List<Movie> getAllMovies() {
        return publicService.getAllMovies();
    }

    // API 2: Get movie by id
    @GetMapping("/movies/{id}")
    public Movie getMovieById(@PathVariable Long id) {
        return publicService.getMovieById(id);
    }

    // API 3: Get movie cast
    @GetMapping("/movies/{id}/cast")
    public String getMovieCast(@PathVariable Long id) {
        return publicService.getMovieCast(id);
    }


    @GetMapping("/theatres")
    public List<?> getAllTheatres() {
        return publicService.getAllTheatres();
    }


    @GetMapping("/movies/{movieId}/shows")
    public List<?> getShowsByMovie(@PathVariable Long movieId) {
        return publicService.getShowsByMovie(movieId);
    }

}
