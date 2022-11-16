package server.team33.login.config;


import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import server.team33.login.handler.UserAccessDeniedHandler;
import server.team33.login.handler.UserAuthSuccessHandler;
import server.team33.login.handler.UserAuthenticationEntryPoint;
import server.team33.login.jwt.JwtToken;
import server.team33.login.jwt.SecretKey;
import server.team33.redis.RedisConfig;

import static org.springframework.security.config.Customizer.withDefaults;

@EnableWebSecurity(debug = true)//배포시 제거
@EnableGlobalMethodSecurity(prePostEnabled = true)
@RequiredArgsConstructor
public class SecurityConfig {
    @Bean
    PasswordEncoder passwordEncoder(){
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }
    private final JwtToken jwtToken;
    private final SecretKey secretKey;
    private final RedisConfig redisConfig;

    @Bean
    public SecurityFilterChain filterChain( HttpSecurity http ) throws Exception{
        http.headers().frameOptions().sameOrigin()
                .and()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .formLogin().disable()
                .httpBasic().disable()
                .csrf().disable()
                .cors(withDefaults())
                .exceptionHandling()
                .accessDeniedHandler(new UserAccessDeniedHandler())
                .authenticationEntryPoint(new UserAuthenticationEntryPoint())
                .and()
                .apply(new CustomFilterConfigurer(jwtToken, redisConfig))
                .and()
                .oauth2Login(oauth2 -> oauth2.successHandler(new UserAuthSuccessHandler(jwtToken)));
//                .authorizeHttpRequests(authorize -> authorize.antMatchers(HttpMethod.POST, "/users").permitAll()
//                .antMatchers(HttpMethod.POST, "/answers").hasRole("USER")
//                .antMatchers(HttpMethod.PATCH, "/answers/**").hasRole("USER")
//                .antMatchers(HttpMethod.DELETE, "/answers/**").hasRole("USER")
//                .antMatchers(HttpMethod.POST, "/questions").hasRole("USER") //질문 포스트
//                .antMatchers(HttpMethod.PATCH, "/questions/**").hasRole("USER")
//                .antMatchers(HttpMethod.DELETE, "/questions/**").hasRole("USER")
//                .anyRequest().permitAll());



        return http.build();
    }
}
