package com.example.authservice.services.jwt;

import com.example.authservice.entity.User;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service
public class JwtService {

    @Value("${JWT_SECRET_KEY}")
    private String secretKey;

    @Value("${JWT_EXP_TIME}")
    private long expTime;

    private Key getSignInKey() {
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    public String generateToken(User user) {
        return generateToken(new HashMap<>(), user);
    }
    public String generateToken(Map<String, Object> extraClaims, User user) {
        return buildToken(extraClaims, user, this.expTime);
    }

    public String buildToken(Map<String, Object> extraClaims, User user, long exp){
        extraClaims.put("email", user.getEmail());

        return Jwts.builder()
                .setClaims(extraClaims)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + exp))
                .signWith(getSignInKey(), SignatureAlgorithm.HS256)
                .compact();
    }
}
