package server.team33.user.entity;

import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class AuthUtils {
    private final List<String> USER_ROLE = List.of(UserRoles.USER.name());

    public List<String> createRoles(){
        return USER_ROLE;
    }
}
