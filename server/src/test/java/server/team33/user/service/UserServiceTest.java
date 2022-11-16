package server.team33.user.service;

import com.google.gson.Gson;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import server.team33.login.dto.LoginDto;
import server.team33.user.dto.UserSignUpDto;
import server.team33.user.entity.User;
import server.team33.user.mapper.UserMapper;
import server.team33.user.repository.UserRepository;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatExceptionOfType;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;

@SpringBootTest
@AutoConfigureMockMvc
class UserServiceTest {
    @Autowired
    private MockMvc mockMvc;
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
        UserSignUpDto userSignUpDto = UserSignUpDto.builder().email("test1@gmail.com").password("12344").address("집주소입니다.").displayName("닉네임").realName("최민석").phone("010-3434-3434").build();
        user = mapper.userSignUpDtoToUser(userSignUpDto);
    }

    @Test
    void 회원가입_테스트() throws Exception{
        //when
        User user1 = userService.joinUser(user);
        //then
        System.out.println(user1.getCreatedAt());
        assertThat(user1.getUserId()).isEqualTo(1L);
    }

    @Test
    void 중복된_이메일_테스트() throws Exception{
        //given
        userService.joinUser(user);
        //when
        UserSignUpDto userSignUpDto = UserSignUpDto.builder().email("test1@gmail.com").password("12344").address("집주소입니다.").displayName("닉네임").realName("최민석").phone("010-3434-3434").build();
        User user1 = mapper.userSignUpDtoToUser(userSignUpDto);
        //then
        assertThatExceptionOfType(RuntimeException.class).isThrownBy(() -> userService.joinUser(user1));

    }

    @Test
    void 중복된_닉네임_테스트() throws Exception{
        //given
        userService.joinUser(user);
        //when
        UserSignUpDto userSignUpDto = UserSignUpDto.builder().email("test2@gmail.com").password("12344").address("집주소입니다.").displayName("닉네임").realName("최민석").phone("010-3434-3434").build();
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
        UserSignUpDto userSignUpDto = UserSignUpDto.builder().email("test2@gmail.com").password("12344").address("집주소입니다.").displayName("닉네임2").realName("최민석").phone("010-3434-3434").build();
        user = mapper.userSignUpDtoToUser(userSignUpDto);
        User user1 = mapper.userSignUpDtoToUser(userSignUpDto);
        //when
        assertThatExceptionOfType(RuntimeException.class).isThrownBy(() -> userService.joinUser(user));
    }

    @Test
    void 가입한_회원_역할_user() throws Exception{
        //given
        User user1 = userService.joinUser(user);

        assertThat(user1.getRoles().get(0)).isEqualTo("USER");
        //when

    }
    @Test
    void 로그인_유저_추출() throws Exception{
        //given"
        UserSignUpDto userDto = UserSignUpDto.builder().address("sdfsdfsdfsdfsdfsd").displayName("test").realName("sdf").email("tkfkd@ddmfi.com").password("sdfsdfsdf").phone("2393949494").build();
        User user1 = mapper.userSignUpDtoToUser(userDto);
         userService.joinUser(user1);
        LoginDto dto = LoginDto.builder().username("tkfkd@ddmfi.com").password("sdfsdfsdf").build();

        Gson gson = new Gson();
        String s = gson.toJson(dto);
        ResultActions perform = mockMvc.perform(post("/users/login").contentType(MediaType.APPLICATION_JSON).content(s));

        String authorization = perform.andReturn().getResponse().getHeader("Authorization");

        mockMvc.perform(get("/users/test").header("Authorization",authorization))
                .andDo(print());


    }
    }

