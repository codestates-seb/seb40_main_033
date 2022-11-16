package server.team33.login.jwt;


import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
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
    @Getter
    @Value("${jwt.access-token-expiration-minutes}")
    private int accessTokenExpirationMinutes;

    @Getter
    @Value("${jwt.refresh-token-expiration-minutes}")
    private int refreshTokenExpirationMinutes;
    private final SecretKey secretKey;

    public String createAccessToken( Map<String, Object> claims, String subject, Date expiration, Key key ){
        return Jwts.builder().setClaims(claims).setSubject(subject).setExpiration(expiration).setIssuedAt(Calendar.getInstance().getTime()).signWith(key).compact();
    }

    public String createRefreshToken( String subject, Date expiration, Key key ){
        return Jwts.builder().setSubject(subject).setExpiration(expiration).setIssuedAt(Calendar.getInstance().getTime()).signWith(key).compact();
    }

    public String extractJws( HttpServletRequest request ){
        return request.getHeader("Authorization").replace("Bearer ", "");
    }

    public String delegateAccessToken( User user ){
        Map<String, Object> claims = new HashMap<>();

        claims.put("username", user.getEmail());
        claims.put("roles", user.getRoles());

        String subject = user.getEmail();
        Date expiration = getExpiration(accessTokenExpirationMinutes);
        Key key = secretKey.getSecretKey(secretKey.getBaseKey());

        return createAccessToken(claims, subject, expiration, key);
    }

    public String delegateRefreshToken( User user ){

        String subject = user.getEmail();
        Date expiration = getExpiration(refreshTokenExpirationMinutes);
        Key key = secretKey.getSecretKey(secretKey.getBaseKey());

        return createRefreshToken(subject, expiration, key);
    }

    private Date getExpiration( int tokenExpirationMinutes ){
        Calendar instance = Calendar.getInstance();
        instance.add(Calendar.MINUTE, tokenExpirationMinutes);
        return instance.getTime();
    }

    //jws 검증 메서드
    public Map<String, Object> verifyJws( HttpServletRequest request ){
        String jws = extractJws(request);
        Key key = secretKey.getSecretKey(secretKey.getBaseKey());

        return getClaims(jws, key).getBody();
    }

    //jws의 클레임 추출
    public Jws<Claims> getClaims( String jws, Key key ){

        return Jwts.parserBuilder().setSigningKey(key) // 시크릿 키 이용해서 토큰 해석
                .build().parseClaimsJws(jws); //클레임값 파싱
    }


}
