package server.team33.user.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import server.team33.cart.entity.Cart;
import server.team33.exception.bussiness.BusinessLogicException;
import server.team33.exception.bussiness.ExceptionCode;
import server.team33.user.dto.UserDto;
import server.team33.user.entity.AuthUtils;
import server.team33.user.entity.User;
import server.team33.user.entity.UserStatus;
import server.team33.user.repository.UserRepository;

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

    public User joinUser( User user ){
        existEmail(user.getEmail());
        existDisplayName(user.getDisplayName());
        encodePassword(user);
        existPhoneNum(user.getPhone());
        createRole(user);
        Cart.createCart(user);
        userRepository.save(user);
        return user;
    }

    private User createRole( User user ){
        List<String> roles = authUtils.createRoles();
        user.setRoles(roles);
        return user;
    }

    private void existPhoneNum(String PhoneNum){
        Optional<User> user  = userRepository.findByPhone(PhoneNum);
        if(user.isPresent()) throw new BusinessLogicException(ExceptionCode.EXIST_PHONE_NUMBER);

    }

    private User encodePassword( User user ){
        String encodedPwd = passwordEncoder.encode(user.getPassword());
        user.setPassword(encodedPwd);
        return user;
    }

    private void existDisplayName( String displayName ){
        Optional<User> user = userRepository.findByDisplayName(displayName);
        if(user.isPresent()) throw new BusinessLogicException(ExceptionCode.EXIST_DISPLAY_NAME);
    }

    private void existEmail( String email ){
        Optional<User> user = userRepository.findByEmail(email);
        if(user.isPresent()) throw new BusinessLogicException(ExceptionCode.EXIST_EMAIL);

    }

    public User getLoginUser(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String name = authentication.getName();
        log.info("회원 이메일 = {}",name);
        Optional<User> user = userRepository.findByEmail(name);
        return user.orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
    }

    public Long getUserId(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String name = authentication.getName();
        Optional<User> user = userRepository.findByEmail(name);
       return user.get().getUserId();
    }
   public User deleteUser(){
       User loginUser = getLoginUser();
       loginUser.setUserStatus(UserStatus.USER_WITHDRAWAL);
       return loginUser;
   }

    public User updateUser( UserDto.Post userDto ){
        User loginUser = getLoginUser();
        encodePassword(loginUser);
        loginUser.setAddress(userDto.getAddress());
        loginUser.setPhone(userDto.getPhone());
        loginUser.setRealName(userDto.getRealName());
        loginUser.setDisplayName(userDto.getDisplayName());
        return loginUser;
    }
}
