package com.cdac.MovieBooking.Service;

import com.cdac.MovieBooking.Dtos.Request.AddTheatereRequestDTO;
import com.cdac.MovieBooking.Entities.Enums.TheatreApprovalStatus;
import com.cdac.MovieBooking.Entities.Enums.TheatreStatus;
import com.cdac.MovieBooking.Entities.Theatre;
import com.cdac.MovieBooking.Entities.User;
import com.cdac.MovieBooking.Repository.TheatreRepository;
import com.cdac.MovieBooking.Repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional // To maintain atomicity in transaction
public class OwnerServiceImpl implements OwnerService{

    private final TheatreRepository theatreRepository;
    private final UserRepository ownerRepository;

    @Override
    public Theatre addTheatre(AddTheatereRequestDTO request, Long OwnerID) {
        //fetch owner by id
        User owner = ownerRepository.findById(OwnerID)
                .orElseThrow(()->new RuntimeException("Owner not found with ID:"+OwnerID));

        /*
         *Build the entity by builder object using builder pattern
         *set name, location, Initial approval status will always be PENDING
         * theater status will be inactive initially
         * owner obj
         */

        Theatre theatre = Theatre.builder()
                .theatreName(request.getTheatreName())
                .location(request.getLocation())
                .owner(owner)
                .TheatreApprovalStatus(TheatreApprovalStatus.PENDING)
                .theatreStatus(TheatreStatus.INACTIVE)
                .build();
        return theatreRepository.save(theatre);

    }
}
