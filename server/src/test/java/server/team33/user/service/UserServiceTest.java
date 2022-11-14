package server.team33.user.service;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import server.team33.user.dto.UserSignUpDto;
import server.team33.user.entity.User;
import server.team33.user.mapper.UserMapper;
import server.team33.user.repository.UserRepository;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatExceptionOfType;

@SpringBootTest
class UserServiceTest {
    @Autowired
    private UserService userService;
    @Autowired
    private UserMapper mapper;
    @Autowired
    private UserRepository userRepository;
    private User user;

    @BeforeEach
    void init(){
        userRepository.deleteAll();
        UserSignUpDto userSignUpDto = UserSignUpDto.builder().email("test1@gmail.com").password("12344").address("집주소입니다.").displayName("닉네임").realName("최민석").phoneNumber("010-3434-3434").build();
        user = mapper.userSignUpDtoToUser(userSignUpDto);
    }

    @Test
    void 회원가입_테스트() throws Exception{
        //when
        User user1 = userService.joinUser(user);
        //then
        assertThat(user1.getUserId()).isEqualTo(1L);
    }

    @Test
    void 중복된_이메일_테스트() throws Exception{
        //given
        userService.joinUser(user);
        //when
        UserSignUpDto userSignUpDto = UserSignUpDto.builder().email("test1@gmail.com").password("12344").address("집주소입니다.").displayName("닉네임").realName("최민석").phoneNumber("010-3434-3434").build();
        User user1 = mapper.userSignUpDtoToUser(userSignUpDto);
        //then
        assertThatExceptionOfType(RuntimeException.class).isThrownBy(() -> userService.joinUser(user1));

    }

    @Test
    void 중복된_닉네임_테스트() throws Exception{
        //given
        userService.joinUser(user);
        //when
        UserSignUpDto userSignUpDto = UserSignUpDto.builder().email("test2@gmail.com").password("12344").address("집주소입니다.").displayName("닉네임").realName("최민석").phoneNumber("010-3434-3434").build();
        user = mapper.userSignUpDtoToUser(userSignUpDto);
        User user1 = mapper.userSignUpDtoToUser(userSignUpDto);
        //then
        assertThatExceptionOfType(RuntimeException.class).isThrownBy(() -> userService.joinUser(user1));
    }

    @Test
    void 중복된_연락처_테스트() throws Exception{
        //given
        userService.joinUser(user);
        //when
        UserSignUpDto userSignUpDto = UserSignUpDto.builder().email("test2@gmail.com").password("12344").address("집주소입니다.").displayName("닉네임2").realName("최민석").phoneNumber("010-3434-3434").build();
        user = mapper.userSignUpDtoToUser(userSignUpDto);
        User user1 = mapper.userSignUpDtoToUser(userSignUpDto);
        //when
        assertThatExceptionOfType(RuntimeException.class).isThrownBy(() -> userService.joinUser(user));
    }

    @Test
    void 가입한_회원역할_user() throws Exception{
        //given
        User user1 = userService.joinUser(user);

        assertThat(user1.getRoles().get(0)).isEqualTo("USER");
        //when

    }


}