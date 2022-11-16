package server.team33.user.login.config;


import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.stereotype.Component;
import server.team33.user.login.filter.JwtLoginFilter;
import server.team33.user.login.filter.JwtVerificationFilter;
import server.team33.user.login.handler.UserAuthFailureHandler;
import server.team33.user.login.handler.UserAuthSuccessHandler;
import server.team33.user.login.jwt.JwtToken;
import server.team33.user.redis.RedisConfig;
import server.team33.user.repository.UserRepository;

@Component
@RequiredArgsConstructor
public class CustomFilterConfigurer extends AbstractHttpConfigurer<CustomFilterConfigurer, HttpSecurity> {
    private final JwtToken jwtToken;
    private final RedisConfig redisConfig;
    private final UserRepository userRepository;

    @Override
    public void configure( HttpSecurity builder ) throws Exception{
        AuthenticationManager authenticationManager = builder.getSharedObject(AuthenticationManager.class);
        JwtLoginFilter jwtLoginFilter = new JwtLoginFilter(authenticationManager,userRepository);//필터 실행
        jwtLoginFilter.setFilterProcessesUrl("/users/login"); //로그인 디폴트 url

        jwtLoginFilter.setAuthenticationFailureHandler(new UserAuthFailureHandler());//로그인 실패시 핸들러 설정
        jwtLoginFilter.setAuthenticationSuccessHandler(new UserAuthSuccessHandler(jwtToken));//로그인 성공시 핸들러 설정

        JwtVerificationFilter jwtVerificationFilter = new JwtVerificationFilter(redisConfig, jwtToken); //jwt인증 필터 설정

        builder.addFilter(jwtLoginFilter) //로그인 필터 추가
                .addFilterAfter(jwtVerificationFilter, JwtLoginFilter.class);//로그인 필터가 실행된 바로 다음 jwt인증 필터 실행
    }
}
