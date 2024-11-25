package com.foodie.service;

import java.util.List;

import com.foodie.Exception.ReviewException;
import com.foodie.model.Review;
import com.foodie.model.User;
import com.foodie.request.ReviewRequest;

public interface ReviewSerive {
	
    public Review submitReview(ReviewRequest review,User user);
    public void deleteReview(Long reviewId) throws ReviewException;
    public double calculateAverageRating(List<Review> reviews);
}
