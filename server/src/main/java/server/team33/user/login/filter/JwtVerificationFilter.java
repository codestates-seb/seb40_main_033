package server.team33.user.login.filter;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.security.SignatureException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.InsufficientAuthenticationException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import server.team33.user.login.jwt.JwtToken;
import server.team33.user.redis.RedisConfig;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/*
jwt 검증 필터
 */
@RequiredArgsConstructor
@Slf4j
@Component
public class JwtVerificationFilter extends OncePerRequestFilter {

    private final RedisConfig redis;
    private final JwtToken jwtToken;

    //클레임을 추출해서 Auth~에 저장하는 메서드
    @Override
    protected void doFilterInternal( HttpServletRequest request, HttpServletResponse response, FilterChain filterChain ) throws ServletException, IOException{
        log.info("doFilterInteral 메서드");
        try{
            Map<String, Object> claims = jwtToken.verifyJws(request); //클레임 추출
            setAuthtoContext(claims);//Authentication에 저장

        } catch(InsufficientAuthenticationException e){
            log.error(InsufficientAuthenticationException.class.getSimpleName());


        } catch(MalformedJwtException e1){
            log.error(MalformedJwtException.class.getSimpleName());


        } catch(SignatureException e1){
            log.error(SignatureException.class.getSimpleName());


        } catch(ExpiredJwtException e1){
            log.error(ExpiredJwtException.class.getSimpleName());


        } catch(Exception e1){
            log.error(Exception.class.getSimpleName());

        }

        filterChain.doFilter(request, response); // 완료되면 다음 필터로 이동
    }

    //토큰 확인 후 예외 처리
    //회원가입할때도 여기로 온다.
    @Override
    protected boolean shouldNotFilter( HttpServletRequest request ) throws ServletException{
        log.info("shoudNotFilter 진입");
        String authorization = request.getHeader("Authorization"); // Authorization의 밸류값 획득

        if(authorization == null){
            log.error(NullPointerException.class.getSimpleName());
            return true; //true면 예외 처리가 된다.
        }

        if(! authorization.startsWith("Bearer ")){
            log.error(MalformedJwtException.class.getSimpleName());
            return true;
        }

        //로그아웃 됐을 때 토큰의 권한이 없어졌는지 확인, 토큰이 레디스에 있으면 로그아웃 된 것, true를 리턴하여 예외처리함.
        if(notVaildatedToken(request)){
            log.error(ExpiredJwtException.class.getSimpleName());
            return true;
        }

        return false;
    }

    //토큰이 로그아웃된 토큰인지 확인하는메서드
    public boolean notVaildatedToken( HttpServletRequest request ){

        String jws = jwtToken.extractJws(request); //토큰에서 Bearer 제거
        //redis 키값 앞에 붙임
        String prefix = "logouttoken";
        return redis.redisTemplate().opsForValue().get(prefix + jws) != null;
    }

    // 권한을 SecurityContextHoler에 저장하는 메서드
    private void setAuthtoContext( Map<String, Object> claims ){
        String username = (String) claims.get("username");// 해당 키값의 밸류 추출(이메일)
        List<String> roles = (List<String>) claims.get("roles");//해당 키값의 밸류 추출(역할)
        List<GrantedAuthority> authorties = roles.stream()//추출한 역할을 바탕으로 권한생성
                .map(role -> new SimpleGrantedAuthority("ROLE_" + role)).collect(Collectors.toList());

        Authentication authentication = new UsernamePasswordAuthenticationToken(username, null, authorties);//authentication에 유저네임과 권한 저장

        SecurityContextHolder.getContext().setAuthentication(authentication);//security~~에 저장

        log.info("sch= {}", SecurityContextHolder.getContext().getAuthentication().getPrincipal());
    }
}
