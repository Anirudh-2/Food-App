package com.foodie.service;

import com.stripe.exception.StripeException;
import com.foodie.model.Order;
import com.foodie.model.PaymentResponse;

public interface PaymentService {
	
	public PaymentResponse generatePaymentLink(Order order) throws StripeException;

}
