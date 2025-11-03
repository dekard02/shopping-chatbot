package com.example.Backend.service;

import com.example.Backend.dto.UserDto;
import com.example.Backend.model.User;

import java.util.List;

public interface UserService {

    public List<UserDto> getAll();
    public List<UserDto> getAll_Customer();
    public String delete_byId(String id);
    public boolean checkLogin(String username, String password, List<UserDto> list);
    public boolean find_duplicate_username(String username, List<UserDto> list);
    public UserDto find_byUserName(String username);
    public String findId_byUserName(String username);
    public UserDto find_byID(String id);
    public UserDto add(String id, String username, String password, String id_role, String customer_name, String phone,
                    String house_address, String address1, String address2, String address3);
    public UserDto update_information(String customer_name, String phone, String house_address, String address1,
                       String address2, String address3, String id);
}
