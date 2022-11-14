package server.team33.login.details;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import server.team33.user.entity.User;
import server.team33.user.repository.UserRepository;

import java.util.Optional;

;

@Component
@RequiredArgsConstructor
@Slf4j
public class PrincipalDetailsService implements UserDetailsService {
    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername( String username ) throws UsernameNotFoundException{
        Optional<User> userEntity = userRepository.findByEmail(username);
        User user = userEntity.orElseThrow(() -> new UsernameNotFoundException(""));
        return PrincipalDetails.builder().user(user).build();
    }
}
