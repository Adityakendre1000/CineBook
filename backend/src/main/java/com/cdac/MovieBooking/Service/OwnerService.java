package com.cdac.MovieBooking.Service;

import com.cdac.MovieBooking.Dtos.Request.AddScreenRequestDTO;
import com.cdac.MovieBooking.Dtos.Request.AddShowRequestDTO;
import com.cdac.MovieBooking.Dtos.Request.AddTheatereRequestDTO;
import com.cdac.MovieBooking.Entities.Screen;
import com.cdac.MovieBooking.Entities.Show;
import com.cdac.MovieBooking.Entities.Theatre;
import jakarta.validation.Valid;
import com.cdac.MovieBooking.Dtos.Response.OwnerDashboardStatsDTO;
import com.cdac.MovieBooking.Dtos.Response.TheatreStatsDTO;

public interface OwnerService {
    /**
     * Method returns a theater obj to controller and client for notification
     * purpose
     * eg:successfully added the theater at location...
     */
    Theatre addTheatre(AddTheatereRequestDTO request, Long OwnerID);

    // add screens
    Screen addScreen(AddScreenRequestDTO request, Long OwnerId);

    Screen updateScreen(Long screenId, com.cdac.MovieBooking.Dtos.Request.UpdateScreenRequestDTO request, Long ownerId);

    void deleteScreen(Long screenId);

    Show addShow(@Valid AddShowRequestDTO request, Long userId);

    OwnerDashboardStatsDTO getStats(Long ownerId);

    java.util.List<Theatre> getAllTheatres(Long ownerId);

    Theatre getTheatreById(Long theatreId);

    TheatreStatsDTO getTheatreStats(Long theatreId);

    java.util.List<com.cdac.MovieBooking.Dtos.Response.TheatreBookingResponseDTO> getTheatreBookings(Long theatreId);

    java.util.List<Show> getTheatreShows(Long theatreId);
}
