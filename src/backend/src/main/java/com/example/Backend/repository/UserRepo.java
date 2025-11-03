package com.example.Backend.repository;

import com.example.Backend.dto.UserDto;
import com.example.Backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface UserRepo extends JpaRepository<User, Integer> {

    @Query("SELECT new com.example.Backend.dto.UserDto(p.id, p.username, p.password, p.id_role, p.customer_name, p.phone, p.house_address, " +
            "p.address1, p.address2, p.address3) FROM Users p WHERE p.active = 1")
    public List<UserDto> getAll();

    @Query("SELECT new com.example.Backend.dto.UserDto(p.id, p.username, p.password, p.id_role, p.customer_name, p.phone, p.house_address, " +
            "p.address1, p.address2, p.address3) FROM Users p WHERE p.id_role = '00003' AND p.active = 1")
    public List<UserDto> getAll_Customer();

    @Transactional
    @Modifying
    @Query(value = "UPDATE Users SET active = 0 WHERE id = ?1", nativeQuery = true)
    public void delete_byId(String id);

    @Query("SELECT new com.example.Backend.dto.UserDto(p.id, p.username, p.password, p.id_role, p.customer_name, p.phone, p.house_address, " +
            "p.address1, p.address2, p.address3) FROM Users p WHERE p.username = ?1 AND p.active = 1")
    public UserDto find_byUserName(String username);

    @Query("SELECT new com.example.Backend.dto.UserDto(p.id, p.username, p.password, p.id_role, p.customer_name, p.phone, p.house_address, " +
            "p.address1, p.address2, p.address3) FROM Users p WHERE p.id = ?1 AND p.active = 1")
    public UserDto find_byID(String id);

    @Query(value = "SELECT id FROM Users WHERE username = ?1")
    public String findId_byUsername(String username);

    @Modifying
    @Query(value = "INSERT INTO Users(id, username, password, id_role, customer_name, phone, house_address, address1, address2, address3) VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10)", nativeQuery = true)
    public void add(String id, String username, String password, String id_role, String customer_name, String phone,
                    String house_address, String address1, String address2, String address3);

    @Transactional
    @Modifying
    @Query(value = "UPDATE Users SET customer_name = ?1, phone = ?2, house_address = ?3, address1 = ?4, address2 = ?5, address3 = ?6 WHERE id = ?7" )
    public void update_information(String customer_name, String phone, String house_address, String address1, String address2, String address3, String id);

}
