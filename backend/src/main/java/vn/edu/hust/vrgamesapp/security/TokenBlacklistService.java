package vn.edu.hust.vrgamesapp.security;

import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
public class TokenBlacklistService {

    private final RedisTemplate<String, String> redisTemplate;

    public void blacklistToken(String token) {
        redisTemplate.opsForValue().set("blacklist:" + token, "true", 604800000, TimeUnit.MILLISECONDS);
    }

    public boolean isTokenBlacklisted(String token) {
        return Boolean.TRUE.equals(redisTemplate.hasKey("blacklist:" + token));
    }
}