package com.example.Backend.dto.request;

import com.example.Backend.dto.UserDto;

import java.io.Serializable;

public class LoginResponseDto implements Serializable {
    private String jwt;
    private String role;
    private UserDto user;

    public LoginResponseDto(){ }

    public LoginResponseDto(String jwt, String role, UserDto user) {
        this.jwt = jwt;
        this.role = role;
        this.user = user;
    }


    public String getJwt() {
        return jwt;
    }

    public String getRole(){
        return role;
    }

    public UserDto getUser(){
        return user;
    }
}
