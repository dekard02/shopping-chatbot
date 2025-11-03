package com.example.Backend.repository;

import com.example.Backend.dto.CartDto;
import com.example.Backend.model.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface CartRepo extends JpaRepository<Cart, Integer> {
    @Transactional
    @Modifying
    @Query(value = "INSERT INTO Cart(id, customer_id, address ,create_date, total) VALUES (?1, ?2, ?3, ?4, ?5)", nativeQuery = true)
    public void add(String id, String customer_id, String address, LocalDate create_date, long total);

    @Transactional
    @Modifying
    @Query(value = "UPDATE Cart SET status = ?1 WHERE id = ?2 AND active = 1", nativeQuery = true)
    public void update_Status(String status, String id);

    @Transactional
    @Modifying
    @Query(value = "UPDATE Cart SET active = 0 WHERE customer_id = ?1 AND active = 1", nativeQuery = true)
    public void delete_Cart_of_User(String customer_id);

    @Query("SELECT new com.example.Backend.dto.CartDto(p.id, p.customer_id, p.address, p.create_date, p.total, p.status) FROM Cart p WHERE p.active = 1")
    public List<CartDto> getAll();

    @Query(value = "SELECT id FROM Cart WHERE active = 1")
    public List<String> get_list_id();

    @Query(value = "SELECT id FROM Cart p WHERE p.customer_id = ?1 AND active = 1")
    public List<String> getId_byCustomerID(String customer_id);

    @Query("SELECT new com.example.Backend.dto.CartDto(p.id, p.customer_id, p.address, p.create_date, p.total, p.status) FROM Cart p Where " +
            "p.customer_id = ?1 AND p.active = 1 ")
    public List<CartDto> getCart_byCustomerID(String customer_id);

    @Query(value = "UPDATE Cart SET customer_id = ?1, address = ?2, create_date = ?3, total = ?4, status = ?5" +
            "WHERE id = ?6", nativeQuery = true)
    public void update_Cart(String customer_id, String address, LocalDate create_date, long total, String status, String id);

    @Query(value = "UPDATE Cart SET active = 0 " +
            "WHERE id = ?1", nativeQuery = true)
    public void delete_Cart(String id);

    @Query("SELECT new com.example.Backend.dto.CartDto(p.id, p.customer_id, p.address, p.create_date, p.total, p.status) FROM Cart p WHERE p.active = 1")
    public List<CartDto> getAllCart();
}
