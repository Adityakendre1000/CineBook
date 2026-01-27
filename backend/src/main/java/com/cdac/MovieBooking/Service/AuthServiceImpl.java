package com.cdac.MovieBooking.Service;

import com.cdac.MovieBooking.Dtos.Request.LoginRequest;
import com.cdac.MovieBooking.Dtos.Request.RegisterRequest;
import com.cdac.MovieBooking.Dtos.Response.LoginResponse;
import com.cdac.MovieBooking.Dtos.Response.RegisterResponse;
import com.cdac.MovieBooking.Dtos.Response.UserResponse;
import com.cdac.MovieBooking.Entities.Enums.UserRole;
import com.cdac.MovieBooking.Entities.Enums.UserStatus;
import com.cdac.MovieBooking.Entities.User;
import com.cdac.MovieBooking.Repository.UserRepository;
import com.cdac.MovieBooking.Security.JwtUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;

    // ========================= REGISTER =========================
    @Override
    public RegisterResponse register(RegisterRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException(
                    "This email is already registered. Please login instead."
            );
        }

        UserRole safeRole = validateRole(request.getUserRole());

        User user = User.builder()
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .gender(request.getGender())
                .dob(request.getDob())
                .mobileNo(request.getMobileNo())
                .userRole(safeRole)
                .userStatus(UserStatus.ACTIVE)
                .build();

        userRepository.save(user);

        return RegisterResponse.builder()
                .success(true)
                .message("Registration successful. Please login to continue.")
                .userId(user.getUserId())
                .email(user.getEmail())
                .role(user.getUserRole().name())
                .build();
    }

    // ========================= LOGIN =========================
    @Override
    public LoginResponse login(LoginRequest request) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        // Fetch user from DB (email is principal)
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        String token = jwtUtil.generateToken(authentication);

        return LoginResponse.builder()
                .success(true)
                .message("Login successful")
                .token(token)
                .user(
                        UserResponse.builder()
                                .userId(user.getUserId())
                                .firstName(user.getFirstName())
                                .lastName(user.getLastName())
                                .email(user.getEmail())
                                .gender(user.getGender())
                                .role(user.getUserRole())
                                .build()
                )
                .build();
    }


    // ========================= ROLE VALIDATION =========================
    private UserRole validateRole(UserRole requestedRole) {
        if (requestedRole == UserRole.ROLE_USER ||
                requestedRole == UserRole.ROLE_OWNER) {
            return requestedRole;
        }
        throw new RuntimeException(
                "Invalid role selected. Only USER or OWNER roles are allowed during registration."
        );
    }
}
