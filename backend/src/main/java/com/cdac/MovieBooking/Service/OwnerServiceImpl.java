package com.cdac.MovieBooking.Service;

import com.cdac.MovieBooking.Dtos.Request.AddScreenRequestDTO;
import com.cdac.MovieBooking.Dtos.Request.AddShowRequestDTO;
import com.cdac.MovieBooking.Dtos.Request.AddTheatereRequestDTO;
import com.cdac.MovieBooking.Entities.*;
import com.cdac.MovieBooking.Entities.Enums.ShowSeatStatus;
import com.cdac.MovieBooking.Entities.Enums.ShowStatus;
import com.cdac.MovieBooking.Entities.Enums.TheatreApprovalStatus;
import com.cdac.MovieBooking.Entities.Enums.TheatreStatus;
import com.cdac.MovieBooking.Exception.InvalidRequestException;
import com.cdac.MovieBooking.Exception.ResourceNotFoundException;
import com.cdac.MovieBooking.Exception.UnauthorizedActionException;
import com.cdac.MovieBooking.Repository.*;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class OwnerServiceImpl implements OwnerService {

    private final TheatreRepository theatreRepository;
    private final UserRepository ownerRepository;
    private final ScreenRepository screenRepository;
    private final MovieRepository movieRepository;
    private final ShowRepository showRepository;
    private final SeatRepository seatRepository;
    private final ShowSeatRepository showSeatRepository;

    @Override
    public Theatre addTheatre(AddTheatereRequestDTO request, Long ownerId) {

        User owner = ownerRepository.findById(ownerId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Owner not found with id: " + ownerId
                        ));

        Theatre theatre = Theatre.builder()
                .theatreName(request.getTheatreName())
                .location(request.getLocation())
                .owner(owner)
                .TheatreApprovalStatus(TheatreApprovalStatus.PENDING)
                .theatreStatus(TheatreStatus.INACTIVE)
                .build();

        return theatreRepository.save(theatre);
    }

    @Override
    public Screen addScreen(AddScreenRequestDTO requestDTO, Long ownerId) {

        Theatre theatre = theatreRepository.findById(requestDTO.getTheatreId())
                .orElseThrow(() -> new ResourceNotFoundException("Theatre not found"));

        if (!theatre.getOwner().getUserId().equals(ownerId)) {
            throw new UnauthorizedActionException(
                    "You do not own this theatre"
            );
        }

        Screen screen = Screen.builder()
                .theatre(theatre)
                .screenNumber(requestDTO.getScreenNumber())
                .totalSeats(requestDTO.getTotalSeats())
                .isActive(true)
                .build();

        return screenRepository.save(screen);
    }

    @Override
    public Show addShow(AddShowRequestDTO request, Long ownerId) {

        Screen screen = screenRepository.findById(request.getScreenId())
                .orElseThrow(() ->  new ResourceNotFoundException("Screen not found"));

        Theatre theatre = screen.getTheatre();

        if (!theatre.getOwner().getUserId().equals(ownerId)) {
            throw new UnauthorizedActionException(
                    "You do not own this theatre"
            );
        }

        Movie movie = movieRepository.findById(request.getMovieId())
                .orElseThrow(() -> new ResourceNotFoundException("Movie not found"));

        // 1️. Create Show
        Show show = showRepository.save(
                Show.builder()
                        .screen(screen)
                        .movie(movie)
                        .showTime(request.getShowTime())
                        .showStatus(ShowStatus.ACTIVE)
                        .build()
        );

        // 2️. Fetch seats for screen
        List<Seat> seats = seatRepository.findByScreen(screen);

        if (seats.isEmpty()) {
            throw new RuntimeException("No seats found for this screen");
        }

        // 3️. Create ShowSeats with owner-defined pricing
        for (Seat seat : seats) {

            BigDecimal price = request.getSeatTypePrices()
                    .get(seat.getSeatType());

            if (price == null) {
                throw new InvalidRequestException(
                        "Invalid or missing price for seat type: " + seat.getSeatType()
                );
            }

            showSeatRepository.save(
                    ShowSeat.builder()
                            .show(show)
                            .seat(seat)
                            .price(price)
                            .showSeatStatus(ShowSeatStatus.AVAILABLE)
                            .build()
            );
        }

        log.info(
                "Show created successfully: showId={}, screenId={}, movieId={}",
                show.getShowId(),
                screen.getScreenId(),
                movie.getMovieId()
        );

        return show;
    }
}
