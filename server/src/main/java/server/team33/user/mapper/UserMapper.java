package server.team33.user.mapper;

import org.mapstruct.Mapper;
import server.team33.user.dto.UserSignUpDto;
import server.team33.user.entity.User;

@Mapper(componentModel = "spring")
public interface UserMapper {
User userSignUpDtoToUser( UserSignUpDto userSignUpDto);

}
