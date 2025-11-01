package com.example.Backend.controller;

import com.example.Backend.RandomGenerate;
import com.example.Backend.dto.ProductDto;
import com.example.Backend.dto.request.ProductRequestDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import com.example.Backend.service.ProductService;

import java.util.LinkedList;
import java.util.List;

@RestController
@RequestMapping(value = "/product")
//@CrossOrigin(value = "http://localhost:3000",allowedHeaders = "*")
public class ProductController {
    @Autowired
    private ProductService productService;


    @GetMapping("")
    public Object getAll() {
        try {
            List<ProductDto> productList = productService.getAll();
            return new ResponseEntity<List<ProductDto>>(productList, HttpStatus.OK);
        }
        catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("Failed", HttpStatus.BAD_REQUEST);
        }
    }


    @GetMapping("/{id}")
    public Object getDetail_byID(@PathVariable String id){
        try {
            ProductDto product = productService.getDetail_byID(id);
            return new ResponseEntity<ProductDto>(product, HttpStatus.OK);
        }
        catch (Exception e) {
            return new ResponseEntity<>("Failed", HttpStatus.BAD_REQUEST);
        }
    }


    @GetMapping("/category_id/{id_cate}")
    public Object getAll_byCateID(@PathVariable String id_cate){
        try {
            List<ProductDto> product_list = productService.getAll_byCateID(id_cate);
            return new ResponseEntity<List<ProductDto>>(product_list, HttpStatus.OK);
        }
        catch (Exception e) {
            return new ResponseEntity<String>("Failed", HttpStatus.BAD_REQUEST);
        }
    }


    @GetMapping("/category_slug/{categorySlug}")
    public Object getProduct_byCateSlug(@PathVariable String categorySlug){
        try {
            List<ProductDto> product_list = productService.getProduct_byCateSlug(categorySlug);
            List<ProductDto> same_cate_list = new LinkedList<ProductDto>();
            int count = 0;
            if(!product_list.isEmpty())
            {
                for (ProductDto product : product_list) {
                    same_cate_list.add(product);
                    count++;
                    if(count == 8){
                        break;
                    }
                }
            }
            return new ResponseEntity<List<ProductDto>>(same_cate_list, HttpStatus.OK);
        }
        catch (Exception e) {
            return new ResponseEntity<String>("Failed", HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/slug/{slug}")
    public Object getAll_bySlug(@PathVariable String slug){
        try {
            List<ProductDto> product_list = productService.getProduct_bySlug(slug);
            return new ResponseEntity<List<ProductDto>>(product_list, HttpStatus.OK);
        }
        catch (Exception e) {
            return new ResponseEntity<String>("Failed", HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/sale")
    public Object getAll_SaleProduct(){
        try {
            List<ProductDto> product_list = productService.getAll_SaleProduct();
            return new ResponseEntity<List<ProductDto>>(product_list, HttpStatus.OK);
        }
        catch (Exception e) {
            return new ResponseEntity<String>("Failed", HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/clothes")
    public Object getAll_Clothes(){
        try {
            List<ProductDto> product_list = productService.getClothes();
            return new ResponseEntity<List<ProductDto>>(product_list, HttpStatus.OK);
        }
        catch (Exception e) {
            return new ResponseEntity<String>("Failed", HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/accessories")
    public Object getAll_Accessory(){
        try {
            List<ProductDto> product_list = productService.getAccessory();
            return new ResponseEntity<List<ProductDto>>(product_list, HttpStatus.OK);
        }
        catch (Exception e) {
            return new ResponseEntity<String>("Failed", HttpStatus.BAD_REQUEST);
        }
    }

    @Transactional
    @PostMapping("/add-product")
    public Object addProduct(@RequestBody ProductRequestDto request){
        try{
            if(productService.check_Title_duplicate(request.getTitle())){
                return new ResponseEntity<String>("Duplicate name", HttpStatus.CONFLICT);
            }

            ProductDto product = productService.add(request);
            return new ResponseEntity<ProductDto>(product, HttpStatus.CREATED);
        }
        catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<String>("Failed", HttpStatus.BAD_REQUEST);
        }
    }

    @Transactional
    @PostMapping("/update-product")
    public Object updateProduct(@RequestBody ProductRequestDto request){
        try{
            if(!productService.check_Id_exist(request.getId())){
                return new ResponseEntity<String>("This product isn't existed", HttpStatus.INTERNAL_SERVER_ERROR);
            }

            ProductDto product = productService.update(request);
            return new ResponseEntity<ProductDto>(product, HttpStatus.CREATED);
        }
        catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<String>("Failed", HttpStatus.BAD_REQUEST);
        }
    }

    @Transactional
    @PostMapping("/delete-product")
    public Object deleteProduct(@RequestBody ProductRequestDto request){
        try{
            if(!productService.check_Id_exist(request.getId())){
                return new ResponseEntity<>("This product isn't existed", HttpStatus.CONFLICT);
            }

            String id = productService.delete(request);
            return new ResponseEntity<>(id, HttpStatus.OK);
        }
        catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>("Failed", HttpStatus.BAD_REQUEST);
        }
    }







}
