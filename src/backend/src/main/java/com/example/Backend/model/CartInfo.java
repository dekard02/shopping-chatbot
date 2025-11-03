package com.example.Backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.List;

@Entity
@Table(name = "CartInfo")
public class CartInfo {
    @Id
    private String cart_id;
    private String product_id;
    private String slug;
    private String color;
    private String size;
    private int quantity;
    private long price;
    private boolean active;

    public CartInfo() {
    }

    public CartInfo(String cart_id, String product_id, String slug, String color, String size, int amount, long price) {
        this.cart_id = cart_id;
        this.product_id = product_id;
        this.slug = slug;
        this.color = color;
        this.size = size;
        this.quantity = amount;
        this.price = price;
        this.active = true;
    }

    public CartInfo(String product_id, String slug, String color, String size, int amount, long price) {
        this.product_id = product_id;
        this.slug = slug;
        this.color = color;
        this.size = size;
        this.quantity = amount;
        this.price = price;
        this.active = true;
    }

    public String getSize() {
        return size;
    }

    public void setSize(String size) {
        this.size = size;
    }

    public String getCart_id() {
        return cart_id;
    }

    public void setCart_id(String cart_id) {
        this.cart_id = cart_id;
    }

    public String getProduct_id() {
        return product_id;
    }

    public void setProduct_id(String product_id) {
        this.product_id = product_id;
    }

    public String getSlug() {
        return slug;
    }

    public void setSlug(String slug) {
        this.slug = slug;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public long getPrice() {
        return price;
    }

    public void setPrice(long price) {
        this.price = price;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }
}
