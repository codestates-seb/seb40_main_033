package server.team33.login.filter;


import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import server.team33.login.details.PrincipalDetails;
import server.team33.login.dto.LoginDto;
import server.team33.login.jwt.JwtToken;
import server.team33.user.entity.User;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@RequiredArgsConstructor
@Slf4j
public class JwtLoginFilter extends UsernamePasswordAuthenticationFilter {


    private final AuthenticationManager authenticationManager;
    private final JwtToken jwtToken;


    @Override
    @SneakyThrows
    public Authentication attemptAuthentication( HttpServletRequest request, HttpServletResponse response ) throws AuthenticationException{
        ObjectMapper objectMapper = new ObjectMapper();
        LoginDto loginDto = objectMapper.readValue(request.getInputStream(), LoginDto.class);

        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(loginDto.getUsername(), loginDto.getPassword());
        log.info("authentication = {}", authenticationToken);

        return authenticationManager.authenticate(authenticationToken);
    }

    @Override
    protected void successfulAuthentication( HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authResult ) throws IOException, ServletException{
        log.info("로그인 성공");
        PrincipalDetails principal = (PrincipalDetails) authResult.getPrincipal();
        User user = principal.getUser();
        //        log.warn("닉네임 = {}",);
        String accessToken = jwtToken.delegateAccessToken(user); //유저정보를 이용해 토큰생성
        String refreshToken = jwtToken.delegateRefreshToken(user);//리프레시 토큰 생성

        response.setHeader("Authorization", "Bearer " + accessToken); // 응답 헤더에 토큰을 담는다.
        response.setHeader("Refresh", refreshToken); //응답 헤더에 리프레시 토큰을 담는다.
        response.setHeader("userId", String.valueOf(user.getUserId()));

        if(user.getDisplayName() != null){
            response.getWriter().write("로그인완료");
            return;
        }

        this.getSuccessHandler().onAuthenticationSuccess(request, response, authResult);
    }
}
