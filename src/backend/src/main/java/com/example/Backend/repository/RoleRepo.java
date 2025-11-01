package com.example.Backend.repository;

import com.example.Backend.dto.RoleDto;
import com.example.Backend.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface RoleRepo extends JpaRepository<Role, Integer> {
    @Query("SELECT new com.example.Backend.dto.RoleDto(p.id, p.name) FROM Roles p WHERE p.id = ?1")
    public RoleDto find_byId(String id);

    @Query(value = "SELECT name FROM Roles WHERE id = ?1")
    public String getName_byId(String id);

    @Query(value = "SELECT id FROM Roles WHERE name = ?1")
    public String getId_byName(String name);
}
