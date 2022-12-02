package server.team33.login.config;


import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
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
import server.team33.redis.RedisConfig;

import static org.springframework.security.config.Customizer.withDefaults;

@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
@RequiredArgsConstructor
public class SecurityConfig {
    @Bean
    PasswordEncoder passwordEncoder(){
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }
    private final JwtToken jwtToken;
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
                .oauth2Login(oauth2 -> oauth2.successHandler(new UserAuthSuccessHandler(jwtToken)))
                .authorizeHttpRequests(authorize -> authorize
                .antMatchers(HttpMethod.GET, "/users/**").hasRole("USER")
                .antMatchers(HttpMethod.PATCH, "/users/**").hasRole("USER")
                .antMatchers(HttpMethod.DELETE, "/users/**").hasRole("USER")
                .antMatchers(HttpMethod.GET, "/carts").hasRole("USER")
                .antMatchers(HttpMethod.POST, "/carts/**").hasRole("USER")
                .antMatchers(HttpMethod.DELETE, "/carts/**").hasRole("USER")
                .antMatchers(HttpMethod.GET, "/payments/**").hasRole("USER")
                .antMatchers(HttpMethod.GET, "/wishes/**").hasRole("USER")
                .antMatchers(HttpMethod.POST, "/wishes/**").hasRole("USER")
                .antMatchers( "/wishes/**").hasRole("USER")
                .antMatchers( "/orders/**").hasRole("USER")
                .antMatchers( "/reviews/**").hasRole("USER")
                .anyRequest().permitAll());

        return http.build();
    }
}
