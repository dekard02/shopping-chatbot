package com.example.Backend.dto.request;

import com.example.Backend.dto.CartInfoDto;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;

public class CartResponseDto implements Serializable {
    private String id;
    private String customer_id;
    private List<CartInfoDto> list_product;
    private String address;
    private LocalDate create_date;
    private long total;
    private String status;

    public CartResponseDto(){}

    public CartResponseDto(String id, String customer_id, List<CartInfoDto> list_product, String address, LocalDate create_date, Long total, String status) {
        this.id = id;
        this.customer_id = customer_id;
        this.list_product = list_product;
        this.address = address;
        this.create_date = create_date;
        this.total = total;
        this.status = status;
    }

    public String getId() {
        return id;
    }

    public String getCustomer_id() {
        return customer_id;
    }

    public List<CartInfoDto> getList_product() {
        return list_product;
    }

    public String getAddress() {
        return address;
    }

    public LocalDate getCreate_date() {
        return create_date;
    }

    public long getTotal() {
        return total;
    }

    public String getStatus() {
        return status;
    }
}
