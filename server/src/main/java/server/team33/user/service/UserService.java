package server.team33.user.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationServiceException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import server.team33.cart.entity.Cart;
import server.team33.cart.repository.CartRepository;
import server.team33.exception.bussiness.BusinessLogicException;
import server.team33.exception.bussiness.ExceptionCode;
import server.team33.login.jwt.JwtToken;
import server.team33.user.dto.UserDto;
import server.team33.user.entity.AuthUtils;
import server.team33.user.entity.User;
import server.team33.user.entity.UserStatus;
import server.team33.user.repository.UserRepository;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthUtils authUtils;
    private final JwtToken jwtToken;
    private final UserInfoFilter userInfoFilter;
    private final CartRepository cartRepository;

    public User joinUser( User user ){
        userInfoFilter.filterUserInfo(user);
        encodePassword(user);
        createRole(user);
        Cart cart = Cart.createCart(user);
        cartRepository.save(cart);
        userRepository.save(user);
        return user;
    }

    public User deleteUser(){
        User loginUser = getLoginUser();
        loginUser.setUserStatus(UserStatus.USER_WITHDRAWAL);
        return loginUser;
    }

    public User updateUser( UserDto.Post userDto ){

        userInfoFilter.filterUpdateUser(userDto);

        User loginUser = getLoginUser();
        loginUser.setAddress(userDto.getAddress());
        loginUser.setPhone(userDto.getPhone());
        loginUser.setRealName(userDto.getRealName());
        loginUser.setDisplayName(userDto.getDisplayName());
        loginUser.setDetailAddress(userDto.getDetailAddress());

        String encodedPwd = passwordEncoder.encode(userDto.getPassword());
        loginUser.setPassword(encodedPwd);

        return loginUser;
    }

    public User updateOAuthInfo( UserDto.PostMoreInfo userDto ){

        Optional<User> loginUser = userRepository.findByEmail(userDto.getEmail());

        if(loginUser.isPresent()){

            userInfoFilter.filterMoreInfo(loginUser.get());
            loginUser.get().setUserStatus(UserStatus.USER_ACTIVE);
            loginUser.get().setAddress(userDto.getAddress());
            loginUser.get().setDetailAddress(userDto.getDetailAddress());
            loginUser.get().setRealName(userDto.getRealName());
            loginUser.get().setPhone(userDto.getPhone());
            loginUser.get().setDisplayName(userDto.getDisplayName());
            loginUser.get().setCreatedAt(ZonedDateTime.now(ZoneId.of("Asia/Seoul")));

            return loginUser.get();
        }

        throw new BusinessLogicException(ExceptionCode.USER_NOT_FOUND);
    }

    public void giveToken( User user, HttpServletResponse response ) throws IOException{
        String s = jwtToken.delegateAccessToken(user);
        String r = jwtToken.delegateRefreshToken(user);
        String accessToken = "Bearer " + s;
        String refreshToken = "Bearer " + r;

        response.setHeader("Authorization", accessToken);
        response.setHeader("Refresh", refreshToken);
        response.setHeader("userId", String.valueOf(user.getUserId()));

        response.getWriter().write("추가 정보 기입 완료");
    }

    private void createRole( User user ){
        List<String> roles = authUtils.createRoles();
        user.setRoles(roles);
    }

    private void encodePassword( User user ){
        String encodedPwd = passwordEncoder.encode(user.getPassword());
        user.setPassword(encodedPwd);
    }

    public User getLoginUser(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String name = authentication.getName();
        log.info("회원 이메일 = {}", name);
        Optional<User> user = userRepository.findByEmail(name);
        return user.orElseThrow(() -> new AuthenticationServiceException("Authentication exception"));
    }

    public Long getUserId(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String name = authentication.getName();
        Optional<User> user = userRepository.findByEmail(name);
        if(user.isPresent()) return user.get().getUserId();
        throw new AuthenticationServiceException("Authentication exception");
    }

}
