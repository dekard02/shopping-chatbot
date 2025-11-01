package com.example.Backend.dto.request;

import java.io.Serializable;

public class LoginRequestDto implements Serializable {
    private String username;
    private String password;

    public LoginRequestDto(){}

    public LoginRequestDto(String username, String password) {
        this.username = username;
        this.password = password;
    }

    public String getUsername(){ return username; }
    public String getPassword(){ return password; }
}
