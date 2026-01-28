package com.cdac.MovieBooking.Controller;

import com.cdac.MovieBooking.Dtos.Response.ApiResponse;
import com.cdac.MovieBooking.Dtos.Response.SeatLayoutResponseDTO;
import com.cdac.MovieBooking.Dtos.Response.ShowResponseDTO;
import com.cdac.MovieBooking.Dtos.Response.TheatreResponseDTO;
import com.cdac.MovieBooking.Entities.Movie;
import com.cdac.MovieBooking.Service.PublicService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/public")
@RequiredArgsConstructor
public class PublicController {

    private final PublicService publicService;

    // API 1: Get all movies
    @GetMapping("/movies")
    public ResponseEntity<ApiResponse<List<Movie>>> getAllMovies() {
        return ResponseEntity.ok(
                ApiResponse.success("Movies fetched successfully", publicService.getAllMovies()));
    }

    // API 2: Get movie by id
    @GetMapping("/movies/{id}")
    public ResponseEntity<ApiResponse<Movie>> getMovieById(@PathVariable Long id) {
        return ResponseEntity.ok(
                ApiResponse.success("Movie fetched successfully", publicService.getMovieById(id)));
    }

    // API 3: Get movie cast
    @GetMapping("/movies/{id}/cast")
    public ResponseEntity<ApiResponse<String>> getMovieCast(@PathVariable Long id) {
        return ResponseEntity.ok(
                ApiResponse.success("Movie cast fetched successfully", publicService.getMovieCast(id)));
    }

    // API 4: Get all theatres
    @GetMapping("/theatres")
    public ResponseEntity<ApiResponse<List<TheatreResponseDTO>>> getAllTheatres() {
        return ResponseEntity.ok(
                ApiResponse.success("Theatres fetched successfully", publicService.getAllTheatres()));
    }

    // API 5: Get shows by movie
    @GetMapping("/movies/{movieId}/shows")
    public ResponseEntity<ApiResponse<List<ShowResponseDTO>>> getShowsByMovie(@PathVariable Long movieId) {
        return ResponseEntity.ok(
                ApiResponse.success("Shows fetched successfully",
                        publicService.getShowsByMovie(movieId)));
    }

    // API 6: Get seat layout for a show
    @GetMapping("/shows/{showId}/seats")
    public ResponseEntity<ApiResponse<SeatLayoutResponseDTO>> getSeatsForShow(@PathVariable Long showId) {
        return ResponseEntity.ok(
                ApiResponse.success("Seat layout fetched successfully",
                        publicService.getSeatsForShow(showId)));
    }
}
