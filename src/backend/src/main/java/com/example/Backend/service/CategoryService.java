package com.example.Backend.service;

import com.example.Backend.dto.CategoryDto;
import com.example.Backend.dto.request.CategoryRequestDto;

import java.util.List;

public interface CategoryService {
    public List<CategoryDto> getAll();
    public String getName_byId(String id);
    public boolean check_Id(String id);
    public boolean check_Name_duplicate(String name);
    public CategoryDto add(CategoryRequestDto category);
    public CategoryDto update(CategoryDto category);
    public String delete(String id);
}
