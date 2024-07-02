package com.example.authservice.services.auth;

import com.example.authservice.entity.User;
import com.example.authservice.models.PasswordChangeRequest;
import com.example.authservice.models.LoginRequest;
import com.example.authservice.models.RegisterRequest;
import com.example.authservice.models.TokenResponse;
import com.example.authservice.repository.AuthRepository;
import com.example.authservice.services.jwt.JwtService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthServiceImpl implements AuthService {
    private final AuthRepository repository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final JwtService jwtService;


    public AuthServiceImpl(AuthRepository repository, BCryptPasswordEncoder passwordEncoder, JwtService jwtService){
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    @Override
    public String register(RegisterRequest request) {
        this.repository.save(new User(request.getEmail(), passwordEncoder.encode(request.getPassword())));
        return "Register is successfully.";
    }

    @Override
    public String passwordChange(PasswordChangeRequest request) {
        Optional<User> optional =  this.repository.findByEmail(request.getEmail());
        if(optional.isPresent()){
            User user = optional.get();

            if(passwordEncoder.matches(request.getOldPassword(), user.getPassword())){
                user.setPassword(passwordEncoder.encode(request.getNewPassword()));
                this.repository.save(user);
                return "Password changed.";
            }

            return "Password not matches.";
        }else{
            return "Email is not found.";
        }
    }

    @Override
    public TokenResponse login(LoginRequest request) {
        Optional<User> optional =  this.repository.findByEmail(request.getEmail());
        if(optional.isPresent()){
            User user = optional.get();
            if(passwordEncoder.matches(request.getPassword(), user.getPassword())){
                TokenResponse token = new TokenResponse();
                token.setAccessToken(this.jwtService.generateToken(user));
                return token;
            }
            return null;
        }
        return null;
    }
}
