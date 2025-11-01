package com.example.Backend.sercurity;

import com.example.Backend.dto.RoleDto;
import com.example.Backend.dto.UserDto;
import com.example.Backend.repository.RoleRepo;
import com.example.Backend.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

@Component
public class UserServiceImplement implements UserDetailsService {
    @Autowired
    private UserRepo userRepository;

    @Autowired
    private RoleRepo roleRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserDto user = userRepository.find_byUserName(username);
        if (user == null) {
            throw new UsernameNotFoundException(username);
        }

        String role = roleRepository.getName_byId(user.getId_role());
        return new CustomUserDetails(user, role);
    }

    public UserDetails loadUserById(String id) throws UsernameNotFoundException {
        UserDto user = userRepository.find_byID(id);
        if (user == null) {
            throw new UsernameNotFoundException(id);
        }

        String role = roleRepository.getName_byId(user.getId_role());

        return new CustomUserDetails(user, role);
    }

}
