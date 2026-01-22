package com.cdac.MovieBooking.Service;

import com.cdac.MovieBooking.Entities.Dtos.UserResponseDto;
import com.cdac.MovieBooking.Entities.User;
import com.cdac.MovieBooking.Repository.UserRepo;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class UserServiceImpl implements UserService{

    private final UserRepo ur;
    private final ModelMapper modelMapper;

    @Override
    public UserResponseDto getUserByEmail(String userEmail) {
        Optional<User> user = ur.findByEmail(userEmail);
        return modelMapper.map(user,UserResponseDto.class);
    }
}
