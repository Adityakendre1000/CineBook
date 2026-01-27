package com.cdac.MovieBooking.Service;

import com.cdac.MovieBooking.Dtos.Request.AddScreenRequestDTO;
import com.cdac.MovieBooking.Dtos.Request.AddShowRequestDTO;
import com.cdac.MovieBooking.Dtos.Request.AddTheatereRequestDTO;
import com.cdac.MovieBooking.Entities.Screen;
import com.cdac.MovieBooking.Entities.Show;
import com.cdac.MovieBooking.Entities.Theatre;
import jakarta.validation.Valid;

public interface OwnerService {
    /** Method returns a theater obj to controller and client for notification purpose
     eg:successfully added the theater at location...
    */
     Theatre addTheatre(AddTheatereRequestDTO request, Long OwnerID);

     //add screens
     Screen addScreen(AddScreenRequestDTO request, Long OwnerId);

    Show addShow(@Valid AddShowRequestDTO request, Long userId);
}
