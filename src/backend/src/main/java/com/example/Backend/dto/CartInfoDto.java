package com.example.Backend.dto;

import java.io.Serializable;
import java.util.Objects;

public class CartInfoDto implements Serializable {
    private String cart_id;
    private String product_id;
    private String slug;
    private String color;
    private String size;
    private int quantity;
    private Long price;

    public CartInfoDto(){ }

    public CartInfoDto(String cart_id, String product_id, String slug, String color, String size, int amount, long price) {
        this.cart_id = cart_id;
        this.product_id = product_id;
        this.slug = slug;
        this.color = color;
        this.size = size;
        this.quantity = amount;
        this.price = price;
    }

    public CartInfoDto(String product_id, String slug, String color, String size, int amount, long price) {
        this.cart_id = null;
        this.product_id = product_id;
        this.slug = slug;
        this.color = color;
        this.size = size;
        this.quantity = amount;
        this.price = price;
    }

    public String getCart_id() {
        return cart_id;
    }

    public String getProduct_id() {
        return product_id;
    }

    public String getSlug() {
        return slug;
    }

    public String getColor() {
        return color;
    }

    public String getSize() {
        return size;
    }

    public int getQuantity() {
        return quantity;
    }

    public long getPrice() {
        return price;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        CartInfoDto entity = (CartInfoDto) o;
        return Objects.equals(this.cart_id, entity.cart_id) &&
                Objects.equals(this.product_id, entity.product_id) &&
                Objects.equals(this.slug, entity.slug) &&
                Objects.equals(this.color, entity.color) &&
                Objects.equals(this.size, entity.size) &&
                Objects.equals(this.quantity, entity.quantity) &&
                Objects.equals(this.price, entity.price);
    }

    @Override
    public int hashCode() {
        return Objects.hash(cart_id, product_id, slug, color, size, quantity, price);
    }

    @Override
    public String toString() {
        return getClass().getSimpleName() + "(" +
                "cart_id = " + cart_id + ", " +
                "product_id = " + product_id + ", " +
                "slug = " + slug + ", " +
                "color = " + color + ", " +
                "size = " + size + ", " +
                "quantity = " + quantity + ", " +
                "price = " + price + ")";
    }
}
