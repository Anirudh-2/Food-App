package com.foodie.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.foodie.model.Address;

public interface AddressRepository extends JpaRepository<Address, Long> {

}
