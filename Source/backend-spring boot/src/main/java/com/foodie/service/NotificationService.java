package com.foodie.service;

import java.util.List;

import com.foodie.model.Notification;
import com.foodie.model.Order;
import com.foodie.model.Restaurant;
import com.foodie.model.User;

public interface NotificationService {
	
	public Notification sendOrderStatusNotification(Order order);
	public void sendRestaurantNotification(Restaurant restaurant, String message);
	public void sendPromotionalNotification(User user, String message);
	
	public List<Notification> findUsersNotification(Long userId);

}
