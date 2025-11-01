package com.example.Backend.service.imple;

import com.example.Backend.dto.UserDto;
import com.example.Backend.repository.UserRepo;
import com.example.Backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserImplement implements UserService {

    @Autowired
    private UserRepo userRepo;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public List<UserDto> getAll() {
        try{
            return userRepo.getAll();
        }
        catch (Exception e){
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public List<UserDto> getAll_Customer() {
        try{
            return userRepo.getAll_Customer();
        }
        catch (Exception e){
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public String delete_byId(String id) {
        try{
            userRepo.delete_byId(id);
            return id;
        }
        catch (Exception e){
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public boolean checkLogin(String username, String password, List<UserDto> list) {
        try {
//            if(list.isEmpty()){
//                System.out.println("Empty list");
//            }
//            else {
//                System.out.println("List is fine, username = " + username + " password = " + password);
//                for (UserDto u : list) {
//                    System.out.println(u.toString());
//                }
//            }
            for (UserDto u : list){
                String raw_password = u.getPassword();
                u.setPassword(passwordEncoder.encode(u.getPassword()));
                if(u.getUsername().equals(username) && passwordEncoder.matches(raw_password, u.getPassword())){
                    return true;
                }
            }
            System.out.println("False");
            return false;
        }
        catch (Exception e){
            System.out.println("Exception");
            return false;
        }
    }

    @Override
    public UserDto find_byUserName(String username) {
        try{
            return userRepo.find_byUserName(username);
        }
        catch (Exception e){
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public String findId_byUserName(String username) {
        try {
            return userRepo.findId_byUsername(username);
        }
        catch (Exception e){
            return null;
        }
    }

    @Override
    public UserDto find_byID(String id) {
        try{
            return userRepo.find_byID(id);
        }
        catch (Exception e){
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public boolean find_duplicate_username(String username, List<UserDto> list) {
        try{
            if(list.isEmpty()){
                return false;
            }
            else {
                for(UserDto u : list){
                    if(u.getUsername().equals(username)){
                        return true;
                    }
                }
            }

            return false;
        }
        catch (Exception e){
            return true;
        }
    }

    @Override
    public UserDto add(String id, String username, String password, String id_role, String customer_name, String phone, String house_address, String address1, String address2, String address3) {
        try{
            password = passwordEncoder.encode(password);
            userRepo.add(id, username, password, id_role,customer_name, phone, house_address, address1, address2, address3);
            return new UserDto(id, username, null, id_role,customer_name, phone, house_address, address1, address2, address3);
        }
        catch (Exception e){
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public UserDto update_information(String customer_name, String phone, String house_address, String address1, String address2, String address3, String id) {
        try{
            userRepo.update_information(customer_name, phone, house_address, address1, address2, address3, id);
            return new UserDto(id, null, null, null, customer_name, phone, house_address, address1, address2, address3);
        }
        catch (Exception e){
            e.printStackTrace();
            return null;
        }
    }
}
