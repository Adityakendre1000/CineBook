package com.cdac.MovieBooking.Service;

import com.cdac.MovieBooking.Dtos.Request.LoginRequest;
import com.cdac.MovieBooking.Dtos.Request.RegisterRequest;
import com.cdac.MovieBooking.Dtos.Response.LoginResponse;
import com.cdac.MovieBooking.Dtos.Response.RegisterResponse;


public interface AuthService {

    RegisterResponse register(RegisterRequest request);

    LoginResponse login(LoginRequest request);
}
