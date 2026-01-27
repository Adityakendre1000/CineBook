package com.cdac.MovieBooking.Service;

import com.cdac.MovieBooking.Dtos.Request.SeatRequestDTO;
import com.cdac.MovieBooking.Dtos.Response.SeatResponseDTO;
import com.cdac.MovieBooking.Entities.Screen;
import com.cdac.MovieBooking.Entities.Seat;
import com.cdac.MovieBooking.Exception.ResourceNotFoundException;
import com.cdac.MovieBooking.Repository.ScreenRepository;
import com.cdac.MovieBooking.Repository.SeatRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SeatServiceImpl implements SeatService {

    private final ScreenRepository screenRepository;
    private final SeatRepository seatRepository;

    @Override
    public List<SeatResponseDTO> createSeats(Long screenId, List<SeatRequestDTO> seatRequestDTOs) {

        Screen screen = screenRepository.findById(screenId)
                .orElseThrow(() -> new ResourceNotFoundException("Screen not found with id " + screenId));

        List<Seat> seats = seatRequestDTOs.stream()
                .map(dto -> Seat.builder()
                        .screen(screen)
                        .seatNumber(dto.getSeatNumber())
                        .seatType(dto.getSeatType())
                        .build())
                .collect(Collectors.toList());

        List<Seat> savedSeats = seatRepository.saveAll(seats);

        return savedSeats.stream()
                .map(seat -> SeatResponseDTO.builder()
                        .seatId(seat.getSeatId())
                        .seatNumber(seat.getSeatNumber())
                        .seatType(seat.getSeatType())
                        .build())
                .collect(Collectors.toList());
    }
}
