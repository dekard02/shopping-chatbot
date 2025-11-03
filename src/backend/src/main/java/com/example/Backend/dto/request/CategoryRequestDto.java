package com.example.Backend.dto.request;

import java.io.Serializable;

public class CategoryRequestDto implements Serializable {
    private String name;

    public CategoryRequestDto(){ }

    public CategoryRequestDto(String name){
        this.name = name;
    }

    public String getName(){ return name; }
}
