package com.example.Backend.dto;

import java.io.Serializable;
import java.util.Objects;

public class UserDto implements Serializable {
    private String id;
    private String username;
    private String password;
    private String id_role;
    private String customer_name;
    private String phone;
    private String house_address;
    private String address1;
    private String address2;
    private String address3;
    public UserDto(){ }

    public UserDto(String id, String username, String password, String id_role,String customer_name, String phone, String house_address, String address1, String address2, String address3) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.id_role = id_role;
        this.customer_name = customer_name;
        this.phone = phone;
        this.house_address = house_address;
        this.address1 = address1;
        this.address2 = address2;
        this.address3 = address3;
    }

    public String getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getCustomer_name() {
        return customer_name;
    }

    public String getPhone() {
        return phone;
    }

    public String getHouse_address() {
        return house_address;
    }

    public String getAddress1() {
        return address1;
    }

    public String getAddress2() {
        return address2;
    }

    public String getAddress3() {
        return address3;
    }

    public String getId_role() {
        return id_role;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UserDto entity = (UserDto) o;
        return Objects.equals(this.id, entity.id) &&
                Objects.equals(this.username, entity.username) &&
                Objects.equals(this.password, entity.password) &&
                Objects.equals(this.id_role, entity.id_role) &&
                Objects.equals(this.customer_name, entity.customer_name) &&
                Objects.equals(this.phone, entity.phone) &&
                Objects.equals(this.house_address, entity.house_address) &&
                Objects.equals(this.address1, entity.address1) &&
                Objects.equals(this.address2, entity.address2) &&
                Objects.equals(this.address3, entity.address3);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, username, password, id_role, customer_name, phone, house_address, address1, address2, address3);
    }

    @Override
    public String toString() {
        return getClass().getSimpleName() + "(" +
                "id = " + id + ", " +
                "username = " + username + ", " +
                "password = " + password + ", " +
                "customer_name = " + customer_name + ", " +
                "phone = " + phone + ", " +
                "house_address = " + house_address + ", " +
                "address1 = " + address1 + ", " +
                "address2 = " + address2 + ", " +
                "address3 = " + address3 + ")";
    }
}
