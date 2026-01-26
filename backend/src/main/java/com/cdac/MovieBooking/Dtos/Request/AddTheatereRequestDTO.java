package com.cdac.MovieBooking.Dtos.Request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class AddTheatereRequestDTO {

    /** This class maps json req coming from client
     * to backend
    Incoming: String Theatre name ,String Location
    */
     @NotBlank
    private String theatreName;

    @NotBlank
    private String location;

}
