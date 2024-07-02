package com.example.authservice.models;

import lombok.Data;

@Data
public class PasswordChangeRequest {
    private String email;
    private String oldPassword;
    private String newPassword;
}
