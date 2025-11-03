package com.example.Backend.dto.request;

import com.example.Backend.dto.CartInfoDto;
import com.example.Backend.model.CartInfo;

import java.io.Serializable;
import java.util.List;

public class CartRequestDto implements Serializable {

    private String user;
    private List<CartInfoDto> list_product;
    private String address;
    private Long total;

    public CartRequestDto(){ }

    public CartRequestDto(String user, List<CartInfoDto> list_product, String address, Long total) {
        this.user = user;
        this.list_product = list_product;
        this.address = address;
        this.total = total;
    }

    public String getUser() {
        return user;
    }
    public List<CartInfoDto> getList_product() {
        return list_product;
    }
    public String getAddress() {
        return address;
    }
    public Long getTotal() {return total;}

}
