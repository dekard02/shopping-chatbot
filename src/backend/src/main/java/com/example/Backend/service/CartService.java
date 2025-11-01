package com.example.Backend.service;

import com.example.Backend.dto.CartDto;
import com.example.Backend.dto.CartInfoDto;
import com.example.Backend.dto.request.CartResponseDto;
import com.example.Backend.model.CartInfo;

import java.util.List;

public interface CartService {
    public List<CartResponseDto> getAll();
    public void add(String cart_id, String customer_id, String address , List<CartInfoDto> list_product, long total);
    public List<String> getAll_Id();
    public List<String> getId_byCustomerID(String customer_id);
    public List<CartDto> getCart_byCustomerID(String customer_id);
    public CartDto updateCart_Status(CartDto cartDto);
}
