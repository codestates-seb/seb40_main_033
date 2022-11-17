package server.team33.login.details;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationServiceException;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import server.team33.user.entity.User;
import server.team33.user.entity.UserStatus;
import server.team33.user.repository.UserRepository;

import java.util.Optional;

;

@Component
@RequiredArgsConstructor
@Slf4j
public class PrincipalDetailsService implements UserDetailsService {
    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername( String username  ) throws UsernameNotFoundException{
        log.info("로그인 진행 함수");
        Optional<User> userEntity = userRepository.findByEmail(username);
        log.info("유저1 ={}",userEntity);
        User user = userEntity.orElseThrow(() -> new InternalAuthenticationServiceException("찾을 수 없는 회원입니다."));
        if( user.getUserStatus() == UserStatus.USER_WITHDRAWAL) throw new AuthenticationServiceException("탈퇴한 회원입니다.");
        log.info("userStatus = {}",user.getUserStatus() );
        return PrincipalDetails.builder().user(user).build();
    }
}
