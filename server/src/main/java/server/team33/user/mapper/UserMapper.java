package server.team33.user.mapper;

import org.mapstruct.Mapper;
import server.team33.user.dto.UserSignUpDto;
import server.team33.user.entity.User;
import server.team33.user.entity.UserStatus;

@Mapper(componentModel = "spring")
public interface UserMapper {
 public static final String DEFAULT_OAUTH2_ID = "default";
 default User userSignUpDtoToUser( UserSignUpDto userSignUpDto){
  User.UserBuilder user = User.builder();

  user.email( userSignUpDto.getEmail() );
  user.displayName( userSignUpDto.getDisplayName() );
  user.password( userSignUpDto.getPassword() );
  user.address( userSignUpDto.getAddress() );
  user.realName( userSignUpDto.getRealName() );
  user.phone( userSignUpDto.getPhone() );
  user.oauthId(DEFAULT_OAUTH2_ID);
  user.userStatus(UserStatus.USER_ACTIVE);
  user.provider(DEFAULT_OAUTH2_ID);
  user.providerId(DEFAULT_OAUTH2_ID);

  return user.build();
 }

}
