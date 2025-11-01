package com.example.Backend.service;

import com.example.Backend.dto.CartDto;
import com.example.Backend.dto.CartInfoDto;
import com.example.Backend.dto.request.CartInfoResponseDto;
import com.example.Backend.model.CartInfo;

import java.util.List;


public interface CartInfoService {
    public void add(List<CartInfoDto> list, String cart_id);
    public List<CartInfoResponseDto> getAll_byCartID(List<CartDto> list_card_id);
    public List<CartInfoDto> delete_list_cartInfo(List<CartInfoDto> delete_list);
    public List<CartInfoDto> modify_list_cartInfo(List<CartInfoDto> modify_list);
    public CartInfoDto delete_cartInfo(CartInfoDto cartInfo);
    public CartInfoDto modify_cartInfo(CartInfoDto cartInfo);

}
