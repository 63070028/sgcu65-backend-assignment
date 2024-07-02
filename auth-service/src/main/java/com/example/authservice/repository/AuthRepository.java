package com.example.authservice.repository;

import com.example.authservice.entity.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AuthRepository extends CrudRepository<User, Long> {
    Optional<User> findByEmail(String email);
}
