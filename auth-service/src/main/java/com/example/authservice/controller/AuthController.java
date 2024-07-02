package com.example.authservice.controller;

import com.example.authservice.models.LoginRequest;
import com.example.authservice.models.PasswordChangeRequest;
import com.example.authservice.models.RegisterRequest;
import com.example.authservice.models.TokenResponse;
import com.example.authservice.services.auth.AuthService;
import com.example.authservice.services.auth.AuthServiceImpl;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@ApiResponse(description = "Authentication Endpoints")
public class AuthController {
    public final AuthServiceImpl authService;

    public AuthController(AuthServiceImpl service){
        this.authService = service;
    }

    @PostMapping("/register")
    public String register(RegisterRequest request){
        return this.authService.register(request);
    }

    @PostMapping("/login")
    public TokenResponse login(LoginRequest request){
        return this.authService.login(request);
    }
    @PutMapping("/passwordChange")
    public String passwordChange(PasswordChangeRequest request){
        return this.authService.passwordChange(request);
    }


}
