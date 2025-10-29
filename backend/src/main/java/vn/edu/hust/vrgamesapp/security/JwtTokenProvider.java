package vn.edu.hust.vrgamesapp.security;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.UnsupportedKeyException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;
import vn.edu.hust.vrgamesapp.exception.VrAPIException;

import javax.crypto.SecretKey;
import java.security.Key;
import java.util.Date;

//Utils class
@Component
public class JwtTokenProvider {
    @Value("${jwt.secret}")
    private String jwtSecret;

    @Value("${jwt.expiration}")
    private long jwtExpirationDate;

    //generate key
    public Key key(){
        return Keys.hmacShaKeyFor(Decoders.BASE64.decode(jwtSecret));
    }

    //generate JWT Token
    public String generateToken(Authentication authentication){
        String username = authentication.getName();
        Date currentDate = new Date();
        Date expireDate = new Date(currentDate.getTime() + jwtExpirationDate);

        String token = Jwts.builder()
                .subject(username)
                .issuedAt(new Date())
                .expiration(expireDate)
                .signWith(key())
                .compact();
        return token;
    }


    //get username(email) from Token
    public String getUsername(String token){
        return Jwts.parser()
                .verifyWith((SecretKey) key())
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .getSubject();
    }

    //validate JWT token
    public boolean validateToken(String token){
        try{
            Jwts.parser()
                    .verifyWith((SecretKey) key())
                    .build()
                    .parse(token);
            return true;
        }catch (MalformedJwtException malformedJwtException){ //Token sai cấu trúc
            throw new VrAPIException(HttpStatus.BAD_REQUEST, "Invalid JWT Token");
        }catch (ExpiredJwtException expiredJwtException){ //Token hết hạn
            throw new VrAPIException(HttpStatus.BAD_REQUEST, "Expired JWT Token");
        }catch (UnsupportedKeyException unsupportedKeyException){ //Token sử sử dụng key/thuật toán ký không được hỗ trợ
            throw new VrAPIException(HttpStatus.BAD_REQUEST, "Unsupported JWT Token");
        }catch (IllegalArgumentException illegalArgumentException){ //Token rỗng/chứa dữ liệu không hợp lệ
            throw new VrAPIException(HttpStatus.BAD_REQUEST, "JWT claims string is null or empty");
        }
    }
}
