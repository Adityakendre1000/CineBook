package com.cdac.MovieBooking.Dtos.Response;

import com.cdac.MovieBooking.Entities.Enums.TheatreApprovalStatus;
import com.cdac.MovieBooking.Entities.Enums.TheatreStatus;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TheatreResponseDTO {

    private Long theatreId;
    private String theatreName;
    private String location;
    private TheatreStatus theatreStatus;
    private TheatreApprovalStatus theatreApprovalStatus;
}
