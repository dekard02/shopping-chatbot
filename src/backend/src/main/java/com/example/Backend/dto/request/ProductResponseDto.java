package com.example.Backend.dto.request;

import java.io.Serializable;

public class ProductResponseDto implements Serializable {
    private String id;
    private String title;
    private String id_cate;
    private String categorySlug;
    private String gender;
    private String image1;
    private String image2;
    private Long price;
    private String slug;
    private String colors;
    private String size;
    private String descriptions;
    private int sale;

    public ProductResponseDto(){

    }

    public ProductResponseDto(String id, String title, String id_cate, String categorySlug, String gender, String image1, String image2,
                              Long price, String slug, String colors, String size, String descriptions, int sale) {
        this.id = id;
        this.title = title;
        this.id_cate = id_cate;
        this.categorySlug = categorySlug;
        this.gender = gender;
        this.image1 = image1;
        this.image2 = image2;
        this.price = price;
        this.slug = slug;
        this.colors = colors;
        this.size = size;
        this.descriptions = descriptions;
        this.sale = sale;
    }

    public String getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getId_cate() {
        return id_cate;
    }

    public String getCategorySlug() {
        return categorySlug;
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

    public String getSlug() {
        return slug;
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
