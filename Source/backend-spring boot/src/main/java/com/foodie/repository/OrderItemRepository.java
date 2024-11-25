package com.foodie.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.foodie.model.OrderItem;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {

}
