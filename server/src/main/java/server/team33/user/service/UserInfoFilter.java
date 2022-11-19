package server.team33.user.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import server.team33.exception.bussiness.BusinessLogicException;
import server.team33.exception.bussiness.ExceptionCode;
import server.team33.user.dto.UserDto;
import server.team33.user.entity.User;
import server.team33.user.repository.UserRepository;

import java.util.Optional;

@Component
@RequiredArgsConstructor
@Slf4j
public class UserInfoFilter {
   private final UserRepository userRepository;

        private void existDisplayName( String displayName ){
            log.info("displayName = {}",displayName);
            if(displayName == null) return;
            Optional<User> user = userRepository.findByDisplayName(displayName);
            if(user.isPresent()) throw new BusinessLogicException(ExceptionCode.EXIST_DISPLAY_NAME);
        }
        public void existEmail( String email ){
            Optional<User> user = userRepository.findByEmail(email);
            if(user.isPresent()) throw new BusinessLogicException(ExceptionCode.EXIST_EMAIL);
        }
        private void existPhoneNum( String phoneNum ){
            log.info("phone = {}",phoneNum);
            if( phoneNum == null) return;
            Optional<User> user = userRepository.findByPhone(phoneNum);
            if(user.isPresent()) throw new BusinessLogicException(ExceptionCode.EXIST_PHONE_NUMBER);
        }

    public void filterUserInfo( User user ){
        existEmail(user.getEmail());
        existDisplayName(user.getDisplayName());
        existPhoneNum(user.getPhone());
    }
    public void filterMoreInfo( User user ){
        existDisplayName(user.getDisplayName());
        existPhoneNum(user.getPhone());
    }

    public void filterUpdateUser( UserDto.Post userDto ){
            existDisplayName(userDto.getDisplayName());
            existPhoneNum(userDto.getPhone());
    }
}
