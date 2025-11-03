package com.example.Backend.dto.request;

import java.io.Serializable;

public class UserRequestDto implements Serializable {
    private String username;
    private String password;
    private String role;
    private String customer_name;
    private String phone;
    private String house_address;
    private String address1;
    private String address2;
    private String address3;

    public UserRequestDto(){ }
    public UserRequestDto(String username, String password, String role,
                          String customer_name, String phone, String house_address, String address1, String address2, String address3) {
        this.username = username;
        this.password = password;
        this.role = role;
        this.customer_name = customer_name;
        this.phone = phone;
        this.house_address = house_address;
        this.address1 = address1;
        this.address2 = address2;
        this.address3 = address3;
    }

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }

    public String getRole() {
        return role;
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


}
