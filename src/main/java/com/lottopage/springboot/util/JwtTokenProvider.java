package com.lottopage.springboot.util;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JwtTokenProvider {
    private final String SECRET_KEY = "your-secret-key"; // 실제 환경에서는 환경변수 등에서 관리

    public String createToken(String username) {
        Date now = new Date();
        // 토큰 유효시간 예시: 1시간 (1000*60*60)
        Date expiry = new Date(now.getTime() + 3600000L);
        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(now)
                .setExpiration(expiry)
                .signWith(SignatureAlgorithm.HS256, SECRET_KEY)
                .compact();
    }
}
