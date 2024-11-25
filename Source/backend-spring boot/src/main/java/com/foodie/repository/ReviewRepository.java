package com.foodie.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.foodie.model.Review;

public interface ReviewRepository extends JpaRepository<Review, Long> {

}
