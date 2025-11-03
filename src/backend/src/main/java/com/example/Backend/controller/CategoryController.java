package com.example.Backend.controller;

import com.example.Backend.dto.CategoryDto;
import com.example.Backend.dto.request.CategoryRequestDto;
import com.example.Backend.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/category")

public class CategoryController {
    @Autowired
    CategoryService categoryService;

    @GetMapping("/getAll")
    private Object getAll() {
        try {
            List<CategoryDto> categoryList = categoryService.getAll();
            return new ResponseEntity<List<CategoryDto>>(categoryList, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<String>("Failed", HttpStatus.BAD_REQUEST);
        }
    }

    @Transactional
    @PostMapping("/add-category")
    private Object addCategory(@RequestBody CategoryRequestDto categoryDto) {
        try {
            String name = categoryDto.getName();
            if (categoryService.check_Name_duplicate(name)) {
                return new ResponseEntity<>("Category name had existed", HttpStatus.BAD_REQUEST);
            }

            CategoryDto category = categoryService.add(categoryDto);
            return new ResponseEntity<CategoryDto>(category, HttpStatus.CREATED);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("Failed", HttpStatus.BAD_REQUEST);
        }
    }

    @Transactional
    @PostMapping("/update-category")
    private Object updateCategory(@RequestBody CategoryDto categoryDto) {
        try {
            String id = categoryDto.getId();
            if (!categoryService.check_Id(id)) {
                return new ResponseEntity<>("Category had not existed", HttpStatus.BAD_REQUEST);
            }
            CategoryDto category = categoryService.update(categoryDto);
            return new ResponseEntity<CategoryDto>(category, HttpStatus.CREATED);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("Failed", HttpStatus.BAD_REQUEST);
        }
    }

    @Transactional
    @DeleteMapping("/delete-category/{id}")
    private Object deleteCategory(@PathVariable String id) {
        try {
            
            if (!categoryService.check_Id(id)) {
                return new ResponseEntity<>("This category doesn't exist", HttpStatus.BAD_REQUEST);
            }
            String response = categoryService.delete(id);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("Failed", HttpStatus.BAD_REQUEST);
        }
    }

}
