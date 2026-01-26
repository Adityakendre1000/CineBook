package com.cdac.MovieBooking.Service;

import com.cdac.MovieBooking.Dtos.Request.AddTheatereRequestDTO;
import com.cdac.MovieBooking.Entities.Theatre;

public interface OwnerService {
    /** Method returns a theater obj to controller and client for notification purpose
     eg:successfully added the theater at location...
    */
     Theatre addTheatre(AddTheatereRequestDTO request, Long OwnerID);
}
