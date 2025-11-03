package com.example.Backend.dto;

import java.io.Serializable;
import java.util.Objects;

public class ProductDto implements Serializable {
    private final String id;
    private final String title;
    private final String id_cate;
    private final String categorySlug;
    private final String gender;
    private final String image1;
    private final String image2;
    private final long price;
    private final String slug;
    private final String colors;
    private final String size;
    private final String descriptions;
    private final int sale;

    public ProductDto(){
        this.id = null;
        this.title = null;
        this.id_cate = null;
        this.categorySlug = null;
        this.gender = null;
        this.image1 = null;
        this.image2 = null;
        this.price = 0;
        this.slug = null;
        this.colors = null;
        this.size = null;
        this.descriptions = null;
        this.sale = 0;
    }

    public ProductDto(String id, String title, String id_cate, String categorySlug, String gender, String image1, String image2, long price, String slug, String colors, String size, String descriptions, int sale) {
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

    public long getPrice() {
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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ProductDto entity = (ProductDto) o;
        return Objects.equals(this.id, entity.id) &&
                Objects.equals(this.title, entity.title) &&
                Objects.equals(this.id_cate, entity.id_cate) &&
                Objects.equals(this.categorySlug, entity.categorySlug) &&
                Objects.equals(this.gender, entity.gender) &&
                Objects.equals(this.image1, entity.image1) &&
                Objects.equals(this.image2, entity.image2) &&
                Objects.equals(this.price, entity.price) &&
                Objects.equals(this.slug, entity.slug) &&
                Objects.equals(this.colors, entity.colors) &&
                Objects.equals(this.size, entity.size) &&
                Objects.equals(this.descriptions, entity.descriptions) &&
                Objects.equals(this.sale, entity.sale);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, title, id_cate, categorySlug, gender, image1, image2, price, slug, colors, size, descriptions, sale);
    }

    @Override
    public String toString() {
        return getClass().getSimpleName() + "(" +
                "id = " + id + ", " +
                "title = " + title + ", " +
                "id_cate = " + id_cate + ", " +
                "categorySlug = " + categorySlug + ", " +
                "gender = " + gender + ", " +
                "image1 = " + image1 + ", " +
                "image2 = " + image2 + ", " +
                "price = " + price + ", " +
                "slug = " + slug + ", " +
                "colors = " + colors + ", " +
                "size = " + size + ", " +
                "descriptions = " + descriptions + ", " +
                "sale = " + sale + ")";
    }
}
