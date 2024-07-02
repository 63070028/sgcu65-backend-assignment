package com.example.authservice.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "users")
@Data
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String email;
    private String password;

    public User(){}

    public User(String email, String password) {
        this.email = email;
        this.password = password;
    }


}
