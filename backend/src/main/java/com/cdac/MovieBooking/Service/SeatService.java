package com.cdac.MovieBooking.Service;

import com.cdac.MovieBooking.Dtos.Request.SeatRequestDTO;
import com.cdac.MovieBooking.Dtos.Response.SeatResponseDTO;

import java.util.List;

public interface SeatService {
    List<SeatResponseDTO> createSeats(Long screenId, List<SeatRequestDTO> seatRequestDTOs);
}
