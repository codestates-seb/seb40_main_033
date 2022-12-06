package server.team33.user.login.jwt;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import server.team33.login.jwt.JwtToken;
import server.team33.login.jwt.SecretKey;
import server.team33.user.entity.User;

import java.security.Key;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.TimeUnit;

import static org.assertj.core.api.Assertions.*;

@SpringBootTest
class JwtTokenTest {
    private String baseKey = "sdfnkblwkemfl123123123123knsdkflk31234";

    @Autowired
    private JwtToken jwtToken;
    private Key key;
    private User user;
    @Autowired
    private SecretKey secretKey;
    @BeforeEach
    void init(){
         key = secretKey.getSecretKey(baseKey);
         user = User.builder().userId(1L).displayName("test").email("test@gmail.com").build();
    }
    @Test
    void access토큰_생성() throws Exception{
        //given

        //when
        String accessToken = getAccessToken(key, user, 2, Calendar.MINUTE);
        //then
        assertThat(accessToken).isNotNull();
    }

    @Test
    void 토큰_만료() throws Exception{
        //given
        //when
        String accessToken = getAccessToken(key, user, 1, Calendar.SECOND);
        TimeUnit.MILLISECONDS.sleep(2000);
        //then
        assertThatExceptionOfType(ExpiredJwtException.class).isThrownBy(() -> verifySignature(accessToken,key));
    }

    @Test
    @DisplayName("jwt 서명이 인증되면 검증된 jwt이다.")
    void jwt_검증() throws Exception {
        //given
        //when
        String accessToken = getAccessToken(key, user, 2, Calendar.MINUTE);
        //then
        assertThatCode(() -> verifySignature(accessToken,key)).doesNotThrowAnyException();
    }

    private String getAccessToken( Key key, User user, int time, int timeUnit ){
        Map<String, Object> claims = new HashMap<>();
        claims.put("username", user.getEmail());
        claims.put("displayName", user.getDisplayName());

        String subject = "test token";
        Calendar calendar = Calendar.getInstance();
        calendar.add(timeUnit, time);
        Date expiration = calendar.getTime();

        String acessToken = jwtToken.createAccessToken(claims, subject, expiration, key);
        return acessToken;
    }

    private void verifySignature( String jws, Key key ){
        Jwts.parserBuilder().setSigningKey(key)     // (1)
                .build().parseClaimsJws(jws);   // (2)
    }
}