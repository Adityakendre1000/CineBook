package com.cdac.MovieBooking.Service;

import com.cdac.MovieBooking.Dtos.Request.UserUpdateRequest;
import com.cdac.MovieBooking.Dtos.Response.UserResponseDto;
import com.cdac.MovieBooking.Entities.User;
import com.cdac.MovieBooking.Exception.ResourceNotFoundException;
import com.cdac.MovieBooking.Repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

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

    @Override
    public UserResponseDto getUserById(Long userId) {
        User user = ur.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "User not found with id: " + userId
                ));
        return modelMapper.map(user,UserResponseDto.class);
    }

    @Override
    public UserUpdateRequest updateUserDetails(UserUpdateRequest userUpdateRequest, Long userId) {
        User user = ur.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "User not found with id: " + userId
                ));
        user.setFirstName(userUpdateRequest.getFirstName());
        user.setLastName(userUpdateRequest.getLastName());
        user.setEmail(userUpdateRequest.getEmail());
        user.setGender(userUpdateRequest.getGender());
        user.setDob(userUpdateRequest.getDob());
        user.setMobileNo(userUpdateRequest.getMobileNo());

        ur.save(user);
        return modelMapper.map(user,UserUpdateRequest.class);
    }

}
