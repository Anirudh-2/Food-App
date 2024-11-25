package com.foodie.service;

import java.util.List;

import com.stripe.exception.StripeException;
import com.foodie.Exception.CartException;
import com.foodie.Exception.OrderException;
import com.foodie.Exception.RestaurantException;
import com.foodie.Exception.UserException;
import com.foodie.model.Order;
import com.foodie.model.PaymentResponse;
import com.foodie.model.User;
import com.foodie.request.CreateOrderRequest;

public interface OrderService {
	
	 public PaymentResponse createOrder(CreateOrderRequest order, User user) throws UserException, RestaurantException, CartException, StripeException;
	 
	 public Order updateOrder(Long orderId, String orderStatus) throws OrderException;
	 
	 public void cancelOrder(Long orderId) throws OrderException;
	 
	 public List<Order> getUserOrders(Long userId) throws OrderException;
	 
	 public List<Order> getOrdersOfRestaurant(Long restaurantId,String orderStatus) throws OrderException, RestaurantException;
	 

}
