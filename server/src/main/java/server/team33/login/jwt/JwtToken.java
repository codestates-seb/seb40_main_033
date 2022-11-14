package server.team33.login.jwt;


import io.jsonwebtoken.Jwts;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import server.team33.user.entity.User;

import javax.servlet.http.HttpServletRequest;
import java.security.Key;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Component
@RequiredArgsConstructor
public class JwtToken {
    private final Expiration expir;
    private final SecretKey secretKey;
    public String createAccessToken( Map<String, Object> claims, String subject, Date expiration, Key key ){
        return Jwts.builder().setClaims(claims)
                .setSubject(subject)
                .setExpiration(expiration)
                .setIssuedAt(Calendar.getInstance().getTime())
                .signWith(key)
                .compact();
    }

    public String createRefreshToken( String subject, Date expiration, Key key ){
        return Jwts.builder()
                .setSubject(subject)
                .setExpiration(expiration)
                .setIssuedAt(Calendar.getInstance().getTime())
                .signWith(key)
                .compact();
    }

    public String extractJws( HttpServletRequest request ){
        return request.getHeader("Authorization").replace("Bearer ","");
    }

    public String delegateAccessToken( User user ){
        Map<String, Object> claims = new HashMap<>();

        claims.put("username", user.getEmail());
        claims.put("roles",user.getRoles());

        String subject = user.getEmail();
        Date expiration = expir.getExpiration(expir.getAccessTokenExpirationMinutes());
        Key key = secretKey.getSecretKey(secretKey.getBaseKey());

        return createAccessToken(claims,subject,expiration,key);
    }
    public String delegateRefreshToken( User user ){

        String subject = user.getEmail();
        Date expiration = expir.getExpiration(expir.getAccessTokenExpirationMinutes());
        Key key = secretKey.getSecretKey(secretKey.getBaseKey());

        return createRefreshToken(subject,expiration,key);
    }


}
