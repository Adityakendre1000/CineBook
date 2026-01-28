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
        private final ShowSeatRepository showSeatRepository;
        private final BookingSeatRepository bookingSeatRepository;

        private final BookingRepository bookingRepository;

        @Override
        public Theatre getTheatreById(Long theatreId) {
                return theatreRepository.findById(theatreId)
                                .orElseThrow(() -> new ResourceNotFoundException("Theatre not found"));
        }

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
        public com.cdac.MovieBooking.Dtos.Response.TheatreStatsDTO getTheatreStats(Long theatreId) {
                BigDecimal revenue = bookingRepository.calculateTotalRevenueByTheatre(theatreId);
                Long tickets = bookingRepository.countTicketsSoldByTheatre(theatreId);
                Long activeShows = showRepository.countActiveShowsByTheatre(theatreId);

                return com.cdac.MovieBooking.Dtos.Response.TheatreStatsDTO.builder()
                                .revenue(revenue != null ? revenue : BigDecimal.ZERO)
                                .visitors(tickets != null ? tickets : 0L)
                                .activeShows(activeShows != null ? activeShows : 0L)
                                .occupancy(0.0) // Placeholder logic for now
                                .build();
        }

        @Override
        public List<com.cdac.MovieBooking.Dtos.Response.TheatreBookingResponseDTO> getTheatreBookings(Long theatreId) {
                // 1. Fetch bookings
                List<Booking> bookings = bookingRepository.findBookingsByTheatre(theatreId);
                if (bookings.isEmpty())
                        return new java.util.ArrayList<>();

                // 2. Fetch seats for these bookings
                List<BookingSeat> bookingSeats = bookingSeatRepository.findByBookingIn(bookings);

                // 3. Group seats by booking
                java.util.Map<Long, java.util.List<String>> seatsMap = bookingSeats.stream()
                                .collect(java.util.stream.Collectors.groupingBy(
                                                bs -> bs.getBooking().getBookingId(),
                                                java.util.stream.Collectors.mapping(
                                                                bs -> bs.getShowSeat().getSeat().getSeatNumber(),
                                                                java.util.stream.Collectors.toList())));

                // 4. Map to DTO
                return bookings.stream()
                                .map(b -> com.cdac.MovieBooking.Dtos.Response.TheatreBookingResponseDTO.builder()
                                                .bookingId(b.getBookingId())
                                                .movieName(b.getShow().getMovie().getTitle())
                                                .showTime(b.getShow().getShowTime().toLocalTime().toString())
                                                .showDate(b.getShow().getShowTime().toLocalDate())
                                                .seats(String.join(", ",
                                                                seatsMap.getOrDefault(b.getBookingId(),
                                                                                java.util.Collections.emptyList())))
                                                .amount(b.getTotalAmount())
                                                .status(b.getBookingStatus())
                                                .customerName(b.getUser().getFirstName() + " "
                                                                + b.getUser().getLastName())
                                                .build())
                                .collect(java.util.stream.Collectors.toList());
        }

        @Override
        public List<Show> getTheatreShows(Long theatreId) {
                return showRepository.findByScreen_Theatre_TheatreId(theatreId);
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
                                .theatreApprovalStatus(TheatreApprovalStatus.PENDING)
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

        @Override
        public Screen updateScreen(Long screenId, com.cdac.MovieBooking.Dtos.Request.UpdateScreenRequestDTO request,
                        Long ownerId) {
                Screen screen = screenRepository.findById(screenId)
                                .orElseThrow(() -> new ResourceNotFoundException("Screen not found"));

                if (!screen.getTheatre().getOwner().getUserId().equals(ownerId)) {
                        throw new UnauthorizedActionException("You do not own this theatre");
                }

                // Update fields
                screen.setLayoutType(request.getLayoutType());

                // Regenerate seats
                // 1. Delete existing seats
                List<Seat> existingSeats = seatRepository.findByScreen(screen);
                seatRepository.deleteAll(existingSeats);

                // 2. Generate new seats
                int totalSeats = generateSeatsForScreen(screen, request.getLayoutType(), request.getRowConfig());
                screen.setTotalSeats(totalSeats);

                return screenRepository.save(screen);
        }

        @Override
        public void deleteScreen(Long screenId) {
                Screen screen = screenRepository.findById(screenId)
                                .orElseThrow(() -> new ResourceNotFoundException("Screen not found"));

                // Soft delete
                screen.setActive(false);
                screenRepository.save(screen);
        }

        private int generateSeatsForScreen(Screen screen, LayoutType layoutType,
                        java.util.Map<String, String> rowConfig) {
                int totalSeats = 0;
                // Define Layout Structure (Row Name -> Capacity)
                java.util.LinkedHashMap<String, Integer> layoutStructure = new java.util.LinkedHashMap<>();

                if (layoutType == LayoutType.SMALL) {
                        // 80 Seats: 8 Rows (A-H) of 10 Columns
                        char[] rows = { 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H' };
                        for (char r : rows)
                                layoutStructure.put(String.valueOf(r), 10);
                } else if (layoutType == LayoutType.MEDIUM) {
                        // 150 Seats: 10 Rows (A-J) of 15 Columns
                        char[] rows = { 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J' };
                        for (char r : rows)
                                layoutStructure.put(String.valueOf(r), 15);
                } else if (layoutType == LayoutType.LARGE) {
                        // 240 Seats: 12 Rows (A-L) of 20 Columns
                        char[] rows = { 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L' };
                        for (char r : rows)
                                layoutStructure.put(String.valueOf(r), 20);
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
                                                .price(java.math.BigDecimal.ZERO)
                                                .build());

                // 2️. Fetch seats for screen
                List<Seat> seats = seatRepository.findByScreen(screen);

                if (seats.isEmpty()) {
                        throw new RuntimeException("No seats found for this screen");
                }

                // 3️. Create ShowSeats with owner-defined pricing
                List<ShowSeat> showSeats = new java.util.ArrayList<>();
                for (Seat seat : seats) {
                        BigDecimal price = request.getSeatTypePrices().get(seat.getSeatType());

                        if (price == null) {
                                throw new InvalidRequestException(
                                                "Invalid or missing price for seat type: " + seat.getSeatType());
                        }

                        showSeats.add(ShowSeat.builder()
                                        .show(show)
                                        .seat(seat)
                                        .price(price)
                                        .showSeatStatus(ShowSeatStatus.AVAILABLE)
                                        .build());
                }

                showSeatRepository.saveAll(showSeats);

                log.info(
                                "Show created successfully: showId={}, screenId={}, movieId={}",
                                show.getShowId(),
                                screen.getScreenId(),
                                movie.getMovieId());

                return show;
        }
}
