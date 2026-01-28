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
import com.cdac.MovieBooking.Entities.Enums.LayoutType;
import com.cdac.MovieBooking.Entities.Enums.SeatType;
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

        private final BookingRepository bookingRepository;

        @Override
        public com.cdac.MovieBooking.Dtos.Response.OwnerDashboardStatsDTO getStats(Long ownerId) {
                BigDecimal totalRevenue = bookingRepository.calculateTotalRevenueByOwner(ownerId);
                Long ticketsSold = bookingRepository.countTicketsSoldByOwner(ownerId);
                Long activeScreens = screenRepository.countActiveScreensByOwner(ownerId);

                return com.cdac.MovieBooking.Dtos.Response.OwnerDashboardStatsDTO.builder()
                                .revenue(totalRevenue != null ? totalRevenue : BigDecimal.ZERO)
                                .ticketsSold(ticketsSold != null ? ticketsSold : 0L)
                                .activeScreens(activeScreens != null ? activeScreens : 0L)
                                .activeScreens(activeScreens != null ? activeScreens : 0L)
                                .build();
        }

        @Override
        public List<Theatre> getAllTheatres(Long ownerId) {
                return theatreRepository.findByOwner_UserId(ownerId);
        }

        @Override
        public Theatre addTheatre(AddTheatereRequestDTO request, Long ownerId) {

                User owner = ownerRepository.findById(ownerId)
                                .orElseThrow(() -> new ResourceNotFoundException(
                                                "Owner not found with id: " + ownerId));

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
                                        "You do not own this theatre");
                }

                // 1. Auto-increment Screen Number
                Integer maxScreenNum = screenRepository.findMaxScreenNumber(theatre.getTheatreId());
                int newScreenNumber = (maxScreenNum == null) ? 1 : maxScreenNum + 1;

                // 2. Create Screen (initially with 0 seats, will update after generation)
                Screen screen = Screen.builder()
                                .theatre(theatre)
                                .screenNumber(newScreenNumber)
                                .layoutType(requestDTO.getLayoutType())
                                .isActive(true)
                                .build();

                screen = screenRepository.save(screen); // Save to get ID

                // 3. Generate Seats based on Layout
                int totalSeatsGenerated = generateSeatsForScreen(screen, requestDTO.getLayoutType(),
                                requestDTO.getRowConfig());

                // 4. Update Total Seats
                screen.setTotalSeats(totalSeatsGenerated);
                return screenRepository.save(screen);
        }

        private int generateSeatsForScreen(Screen screen, LayoutType layoutType,
                        java.util.Map<String, String> rowConfig) {
                int totalSeats = 0;
                // Define Layout Structure (Row Name -> Capacity)
                java.util.LinkedHashMap<String, Integer> layoutStructure = new java.util.LinkedHashMap<>();

                if (layoutType == LayoutType.SMALL) {
                        layoutStructure.put("A", 10);
                        layoutStructure.put("B", 12);
                        layoutStructure.put("C", 14);
                        layoutStructure.put("D", 14);
                        layoutStructure.put("E", 10);
                } else if (layoutType == LayoutType.MEDIUM) {
                        layoutStructure.put("A", 15);
                        layoutStructure.put("B", 15);
                        layoutStructure.put("C", 15);
                        layoutStructure.put("D", 15);
                        layoutStructure.put("E", 15);
                        layoutStructure.put("F", 15);
                        layoutStructure.put("G", 12);
                } else if (layoutType == LayoutType.LARGE) {
                        char[] rows = { 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I' };
                        for (char r : rows)
                                layoutStructure.put(String.valueOf(r), 20);
                        layoutStructure.put("J", 15);
                        layoutStructure.put("K", 15);
                }

                java.util.List<Seat> seatsToSave = new java.util.ArrayList<>();

                for (java.util.Map.Entry<String, Integer> entry : layoutStructure.entrySet()) {
                        String row = entry.getKey();
                        int capacity = entry.getValue();

                        // Determine SeatType for this row
                        // User sends config like: "A-C": "NORMAL", "D-F": "PRIME"
                        // We need to match the current 'row' to the config range/key.
                        // For simplicity, let's assume the frontend sends explicit mapping or ranges we
                        // parse.
                        // OR even simpler: Frontend sends default if not specified.

                        SeatType type = SeatType.NORMAL; // Default

                        if (rowConfig != null) {
                                // Check exact match
                                if (rowConfig.containsKey(row)) {
                                        type = SeatType.valueOf(rowConfig.get(row));
                                } else {
                                        // Check range logic (Simple iteration over keys to see if row falls in range)
                                        // e.g. Key "A-C"
                                        for (String key : rowConfig.keySet()) {
                                                if (key.contains("-")) {
                                                        String[] parts = key.split("-");
                                                        if (parts.length == 2) {
                                                                char start = parts[0].charAt(0);
                                                                char end = parts[1].charAt(0);
                                                                char currentRow = row.charAt(0);
                                                                if (currentRow >= start && currentRow <= end) {
                                                                        type = SeatType.valueOf(rowConfig.get(key));
                                                                        break;
                                                                }
                                                        }
                                                }
                                        }
                                }
                        }

                        for (int i = 1; i <= capacity; i++) {
                                seatsToSave.add(Seat.builder()
                                                .screen(screen)
                                                .seatNumber(row + i)
                                                .seatType(type)
                                                .build());
                                totalSeats++;
                        }
                }

                seatRepository.saveAll(seatsToSave);
                return totalSeats;
        }

        @Override
        public Show addShow(AddShowRequestDTO request, Long ownerId) {

                Screen screen = screenRepository.findById(request.getScreenId())
                                .orElseThrow(() -> new ResourceNotFoundException("Screen not found"));

                Theatre theatre = screen.getTheatre();

                if (!theatre.getOwner().getUserId().equals(ownerId)) {
                        throw new UnauthorizedActionException(
                                        "You do not own this theatre");
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
                                                .build());

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
                                                "Invalid or missing price for seat type: " + seat.getSeatType());
                        }

                        showSeatRepository.save(
                                        ShowSeat.builder()
                                                        .show(show)
                                                        .seat(seat)
                                                        .price(price)
                                                        .showSeatStatus(ShowSeatStatus.AVAILABLE)
                                                        .build());
                }

                log.info(
                                "Show created successfully: showId={}, screenId={}, movieId={}",
                                show.getShowId(),
                                screen.getScreenId(),
                                movie.getMovieId());

                return show;
        }
}
