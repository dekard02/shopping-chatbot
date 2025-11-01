package com.example.Backend.dto;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Date;
import java.util.Objects;

public class CartDto implements Serializable {
    private String id;
    private String customer_id;
    private String address;
    private LocalDate create_date;
    private Long total;
    private String status;

    public CartDto(){}
    public CartDto(String id, String customer_id, String address, LocalDate create_date, Long total, String status) {
        this.id = id;
        this.customer_id = customer_id;
        this.address = address;
        this.create_date = create_date;
        this.total = total;
        this.status = status;
    }

    public String getId() {
        return id;
    }

    public String getCustomer_id() {
        return customer_id;
    }

    public String getAddress() {
        return address;
    }

    public LocalDate getCreate_date() {
        return create_date;
    }

    public Long getTotal() {
        return total;
    }

    public String getStatus() {
        return status;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        CartDto entity = (CartDto) o;
        return Objects.equals(this.id, entity.id) &&
                Objects.equals(this.customer_id, entity.customer_id) &&
                Objects.equals(this.address, entity.address) &&
                Objects.equals(this.create_date, entity.create_date) &&
                Objects.equals(this.total, entity.total) &&
                Objects.equals(this.status, entity.status);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, customer_id, address, create_date, total, status);
    }

    @Override
    public String toString() {
        return getClass().getSimpleName() + "(" +
                "id = " + id + ", " +
                "customer_id = " + customer_id + ", " +
                "address = " + address + ", " +
                "create_date = " + create_date + ", " +
                "total = " + total + ", " +
                "status = " + status;
    }
}
