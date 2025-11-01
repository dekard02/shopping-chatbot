package com.example.Backend.controller;

import com.example.Backend.RandomGenerate;
import com.example.Backend.dto.CartDto;
import com.example.Backend.dto.CartInfoDto;
import com.example.Backend.dto.request.CartInfoResponseDto;
import com.example.Backend.dto.request.CartRequestDto;
import com.example.Backend.dto.request.CartResponseDto;
import com.example.Backend.model.CartInfo;
import com.example.Backend.service.CartInfoService;
import com.example.Backend.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/cart")
@RestController
public class CartController {
    @Autowired
    private CartService cartService;
    @Autowired
    private CartInfoService cartInfoService;

    @GetMapping("/get-all")
    private Object getAll(){
        try{
            return new ResponseEntity<>(cartService.getAll(), HttpStatus.OK);
        }
        catch (Exception e){
            return new ResponseEntity<>("Failed", HttpStatus.BAD_REQUEST);
        }
    }

    @Transactional
    @PostMapping("/buy")
    private Object saveCart(@RequestBody CartRequestDto cartRequestDto){
        try{
            System.out.println(cartRequestDto.getUser());
            String cart_new_id = "";
            do{
                boolean is_duplicate = false;
                cart_new_id = RandomGenerate.GenerateId(9);
                for (String id : cartService.getAll_Id()) {
                    if(id == cart_new_id){
                        is_duplicate = true;
                    }
                }
                if(!is_duplicate){
                    break;
                }
            }
            while (true);
            String customer_id = cartRequestDto.getUser();
            String address = cartRequestDto.getAddress();
            List<CartInfoDto> list = cartRequestDto.getList_product();
            long total = cartRequestDto.getTotal();
            cartService.add(cart_new_id, customer_id, address, list, total);
            cartInfoService.add(list, cart_new_id);
            return new ResponseEntity<>("Success", HttpStatus.CREATED);
        }
        catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>("Failed", HttpStatus.BAD_REQUEST);
        }
    }
    // @GetMapping("/getAllCart")
    // public Object getAllCart() {
    //     try {
    //         List<CartResponseDto> cartList = cartService.getAll();
    //         return new ResponseEntity<List<CartDto>>(cartList, HttpStatus.OK);
    //     } catch (Exception e) {
    //         return new ResponseEntity<String>("Failed", HttpStatus.BAD_REQUEST);
    //     }
    // }

    @GetMapping("/{customer_id}")
    private Object getAll_byCustomerID(@PathVariable String customer_id){
        try{
            List<CartDto> list_cart = cartService.getCart_byCustomerID(customer_id);
            return new ResponseEntity<List<CartInfoResponseDto>>(cartInfoService.getAll_byCartID(list_cart), HttpStatus.OK);
        }
        catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<String>("Failed", HttpStatus.BAD_REQUEST);
        }
    }

    @Transactional
    @PostMapping("/update-by-id")
    private Object updateCart_Status(@RequestBody CartDto cartDto){
        try{
            cartService.updateCart_Status(cartDto);
            return new ResponseEntity<>("Update status complete", HttpStatus.OK);
        }
        catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>("Failed", HttpStatus.BAD_REQUEST);
        }
    }

}
