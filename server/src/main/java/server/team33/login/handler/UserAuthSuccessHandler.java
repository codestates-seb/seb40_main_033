package server.team33.login.handler;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.util.UriComponentsBuilder;
import server.team33.login.details.PrincipalDetails;
import server.team33.login.jwt.JwtToken;
import server.team33.user.entity.User;


import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.URI;
import java.util.ArrayList;
import java.util.List;


/*
로그인 성공 시 마지막에 오는 클래스
 */
@Slf4j
@Component
@RequiredArgsConstructor
public class UserAuthSuccessHandler extends SimpleUrlAuthenticationSuccessHandler implements AuthenticationSuccessHandler {
    private final JwtToken jwtToken;


    @Override
    public void onAuthenticationSuccess( HttpServletRequest request, HttpServletResponse response, Authentication authentication ) throws IOException, ServletException{
        log.info("로그인 성공 후 리다이렉트");
        PrincipalDetails principalDetails = getPrincipalDetails(authentication);
        if(principalDetails.getUser().getDiplayName() == null){
            log.info("닉네임 없음");
            moreInfo(request, response, authentication);
            return;
        }
        redirect(request, response, authentication);
        log.info("토큰 발행 성공");
    }

    private void moreInfo( HttpServletRequest request, HttpServletResponse response, Authentication authentication ) throws IOException{
        PrincipalDetails principalDetails = getPrincipalDetails(authentication);

        List<String> tokens = delegateToken(principalDetails.getUser(), jwtToken);

        String uri = infoURI(tokens.get(0), tokens.get(1)).toString();
        getRedirectStrategy().sendRedirect(request, response, uri);

    }

    private void redirect( HttpServletRequest request, HttpServletResponse response, Authentication authentication ) throws IOException{
        PrincipalDetails principalDetails = getPrincipalDetails(authentication);
        log.error("{}", principalDetails);

        List<String> tokens = delegateToken(principalDetails.getUser(), jwtToken);

        String uri = createURI(tokens.get(0), tokens.get(1)).toString();
        getRedirectStrategy().sendRedirect(request, response, uri);
    }

    private List<String> delegateToken( User user, JwtToken jwtToken ){
        List<String> tokens = new ArrayList<>();

        tokens.add(jwtToken.delegateAccessToken(user));
        tokens.add(jwtToken.delegateRefreshToken(user));

        return tokens;
    }

    private PrincipalDetails getPrincipalDetails( Authentication authentication ){
        PrincipalDetails principalDetails = (PrincipalDetails) authentication.getPrincipal(); //컨텍스트에 담긴 유저정보 추출
        return principalDetails;
    }

    private URI createURI( String accessToken, String refreshToken ){
        MultiValueMap<String, String> queryParams = new LinkedMultiValueMap<>();
        queryParams.add("access_token", "Bearer " + accessToken);
        log.error("{}", queryParams);
        queryParams.add("refresh_token", refreshToken);
        log.error("{}", queryParams);
        return UriComponentsBuilder.newInstance().scheme("http").host("localhost").port(8080) // 호스트랑 포트는 나중에 변경해야한다.
                .path("/recive-token.html").queryParams(queryParams).build().toUri();
    }

    private URI infoURI( String accessToken, String refreshToken ){
        MultiValueMap<String, String> queryParams = new LinkedMultiValueMap<>();
        queryParams.add("access_token", "Bearer " + accessToken);
        log.error("{}", queryParams);
        queryParams.add("refresh_token", refreshToken);
        log.error("{}", queryParams);
        return UriComponentsBuilder.newInstance().scheme("http").host("localhost").port(8080) // 호스트랑 포트는 나중에 변경해야한다.
                .path("/recive-token2.html").queryParams(queryParams).build().toUri();
    }


}
