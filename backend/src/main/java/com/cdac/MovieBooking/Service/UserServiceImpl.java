package com.cdac.MovieBooking.Service;

import com.cdac.MovieBooking.Dtos.Response.UserResponseDto;
import com.cdac.MovieBooking.Entities.User;
import com.cdac.MovieBooking.Repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class UserServiceImpl implements UserService{

    private final UserRepository ur;
    private final ModelMapper modelMapper;

    @Override
    public UserResponseDto getUserByEmail(String userEmail) {
        User user = ur.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "User not found with email: " + userEmail));

        return modelMapper.map(user,UserResponseDto.class);
    }

}
