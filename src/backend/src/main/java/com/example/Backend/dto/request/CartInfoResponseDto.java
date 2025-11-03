package com.example.Backend.dto.request;

import com.example.Backend.dto.CartInfoDto;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;

public class CartInfoResponseDto implements Serializable {
    private String cart_id;
    private List<CartInfoDto> list_product;
    private String address;
    private LocalDate create_date;
    private Long total;
    private String status;

    public CartInfoResponseDto() {}

    public CartInfoResponseDto(String cart_id, List<CartInfoDto> list_product, String address, LocalDate create_date, Long total, String status) {
        this.cart_id = cart_id;
        this.list_product = list_product;
        this.address = address;
        this.create_date = create_date;
        this.total = total;
        this.status = status;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getCart_id() {
        return cart_id;
    }

    public void setCart_id(String cart_id) {
        this.cart_id = cart_id;
    }

    public List<CartInfoDto> getList_product() {
        return list_product;
    }

    public void setList_product(List<CartInfoDto> list_product) {
        this.list_product = list_product;
    }

    public LocalDate getCreate_date() {
        return create_date;
    }

    public void setCreate_date(LocalDate create_date) {
        this.create_date = create_date;
    }

    public Long getTotal() {
        return total;
    }

    public void setTotal(long total) {
        this.total = total;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
