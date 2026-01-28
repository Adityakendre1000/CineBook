package com.cdac.MovieBooking.Controller;

import com.cdac.MovieBooking.Dtos.Request.MovieDTO;
import com.cdac.MovieBooking.Dtos.Response.AdminDashboardStatsDTO;
import com.cdac.MovieBooking.Dtos.Response.ApiResponse;
import com.cdac.MovieBooking.Entities.Movie;
import com.cdac.MovieBooking.Entities.Theatre;
import com.cdac.MovieBooking.Entities.User;
import com.cdac.MovieBooking.Service.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
public class AdminController {

    private final AdminService adminService;

    //  DASHBOARD STATS
    @GetMapping("/stats")
    public ResponseEntity<ApiResponse<AdminDashboardStatsDTO>> getStats() {
        return ResponseEntity.ok(ApiResponse.success("Stats fetched", adminService.getDashboardStats()));
    }

    // USER MANAGEMENT
    @GetMapping("/users")
    public ResponseEntity<ApiResponse<List<User>>> getAllUsers() {
        return ResponseEntity.ok(ApiResponse.success("Users fetched", adminService.getAllUsers()));
    }

    @PatchMapping("/users/{id}/status")
    public ResponseEntity<ApiResponse<User>> updateUserStatus(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success("User status updated", adminService.updateUserStatus(id)));
    }

    //  MOVIE MANAGEMENT
    @GetMapping("/movies")
    public ResponseEntity<ApiResponse<List<Movie>>> getAllMovies() {
        return ResponseEntity.ok(ApiResponse.success("Movies fetched", adminService.getAllMovies()));
    }

    @PostMapping("/movies")
    public ResponseEntity<ApiResponse<Movie>> addMovie(@RequestBody MovieDTO movieDTO) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Movie added", adminService.addMovie(movieDTO)));
    }

    @PutMapping("/movies/{id}")
    public ResponseEntity<ApiResponse<Movie>> updateMovie(@PathVariable Long id, @RequestBody MovieDTO movieDTO) {
        return ResponseEntity.ok(ApiResponse.success("Movie updated", adminService.updateMovie(id, movieDTO)));
    }

    @PatchMapping("/movies/{id}/status")
    public ResponseEntity<ApiResponse<Movie>> updateMovieStatus(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success("Movie status updated", adminService.updateMovieStatus(id)));
    }

    // THEATRE APPROVALS
    @GetMapping("/theatres")
    public ResponseEntity<ApiResponse<List<Theatre>>> getAllTheatres() {
        return ResponseEntity.ok(ApiResponse.success("Theatres fetched", adminService.getAllTheatres()));
    }

    @GetMapping("/approvals")
    public ResponseEntity<ApiResponse<List<Theatre>>> getPendingTheatres() {
        return ResponseEntity.ok(ApiResponse.success("Pending theatres fetched", adminService.getPendingTheatres()));
    }

    @PatchMapping("/approvals/{id}")
    public ResponseEntity<ApiResponse<Theatre>> approveTheatre(@PathVariable Long id, @RequestParam boolean approved) {
        String msg = approved ? "Theatre approved" : "Theatre rejected";
        return ResponseEntity.ok(ApiResponse.success(msg, adminService.approveTheatre(id, approved)));
    }
}
