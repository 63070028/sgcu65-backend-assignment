package com.example.authservice.services.auth;

import com.example.authservice.models.PasswordChangeRequest;
import com.example.authservice.models.LoginRequest;
import com.example.authservice.models.RegisterRequest;
import com.example.authservice.models.TokenResponse;

public interface AuthService {
    TokenResponse login(LoginRequest request);

    String passwordChange(PasswordChangeRequest request);

    String register(RegisterRequest request);
}
