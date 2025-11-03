package com.example.Backend.dto.request;

import java.io.Serializable;

public class ProductRequestDto implements Serializable {
    private String id;
    private String title;
    private String category;
    private String gender;
    private String image1;
    private String image2;
    private Long price;
    private String colors;
    private String size;
    private String descriptions;
    private int sale;

    public ProductRequestDto(){ }
    public ProductRequestDto(String id,String title, String category, String gender, String image1,
                             String image2, Long price, String colors, String size, String descriptions, int sale) {
        this.id = id;
        this.title = title;
        this.category = category;
        this.gender = gender;
        this.image1 = image1;
        this.image2 = image2;
        this.price = price;
        this.colors = colors;
        this.size = size;
        this.descriptions = descriptions;
        this.sale = sale;
    }

    public String getId(){ return id; }
    public String getTitle() {
        return title;
    }
    public String getCategory() {
        return category;
    }
    public String getGender() {
        return gender;
    }
    public String getImage1() {
        return image1;
    }
    public String getImage2() {
        return image2;
    }
    public Long getPrice() {
        return price;
    }
    public String getColors() {
        return colors;
    }
    public String getSize() {
        return size;
    }
    public String getDescriptions() {
        return descriptions;
    }
    public int getSale() {
        return sale;
    }
}
