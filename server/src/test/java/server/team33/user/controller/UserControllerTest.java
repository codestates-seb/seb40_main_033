package server.team33.user.controller;

import com.google.gson.Gson;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import server.team33.login.dto.LoginDto;
import server.team33.user.dto.UserDto;
import server.team33.user.entity.User;
import server.team33.user.entity.UserStatus;
import server.team33.user.mapper.UserMapper;
import server.team33.user.repository.UserRepository;
import server.team33.user.service.UserService;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class UserControllerTest {
    @Autowired
    private UserMapper mapper;
    @Autowired
    private UserService userService;
    @Autowired
    private MockMvc mockMvc;
    private Gson gson;
    private String authorization;
    @Autowired
    private UserRepository userRepository;

    @BeforeEach
    void init() throws Exception{
        userRepository.deleteAll();
        jwt_join();
        ouath_join();

        LoginDto dto = LoginDto.builder().username("tkfkd@ddmfi.com").password("sdfsdfsdf").build();
        gson = new Gson();
        String s = gson.toJson(dto);
        ResultActions perform = mockMvc.perform(post("/users/login").contentType(MediaType.APPLICATION_JSON).content(s));
        authorization = perform.andReturn().getResponse().getHeader("Authorization");
    }


    @Test
    void 회원정보_보내기() throws Exception{

        mockMvc.perform(get("/users").header("Authorization", authorization)).andExpect(status().is2xxSuccessful()).andExpect(jsonPath("$.address").value("sdfsdfsdfsdfsdfsd")).andExpect(jsonPath("$.displayName").value("test")).andExpect(jsonPath("$.realName").value("sdf")).andExpect(jsonPath("$.email").value("tkfkd@ddmfi.com")).andExpect(jsonPath("$.phone").value("2393949494")).andDo(print());
    }

    @Test
    void 회원_정보_수정() throws Exception{

        UserDto.Post newDto = UserDto.Post.builder().address("서울시 동대문구 압구정동").displayName("김삿1갓").realName("김김감").email("tkfkd@ddmfi.com").password("dlszheldektl").phone("1010120302323").build();
        String s1 = gson.toJson(newDto);
        //then
        mockMvc.perform(patch("/users").header("Authorization", authorization).contentType(MediaType.APPLICATION_JSON).content(s1)).andExpect(status().is2xxSuccessful()).andExpect(jsonPath("$.address").value("서울시 동대문구 압구정동")).andExpect(jsonPath("$.displayName").value("김삿1갓")).andExpect(jsonPath("$.realName").value("김김감")).andExpect(jsonPath("$.phone").value("1010120302323")).andDo(print());
    }

    @Test
    void 회원_탈퇴() throws Exception{
        //then
        mockMvc.perform(delete("/users").header("Authorization", authorization)).andExpect(status().is2xxSuccessful()).andExpect(content().string(UserStatus.USER_WITHDRAWAL.getStatus())).andDo(print());
    }

    @Test
    void 회원_탈퇴_후_로그인_불가() throws Exception{
        //given
        mockMvc.perform(delete("/users").header("Authorization", authorization)).andExpect(status().is2xxSuccessful()).andExpect(content().string(UserStatus.USER_WITHDRAWAL.getStatus())).andDo(print());
        //when
        LoginDto dto = LoginDto.builder().username("tkfkd@ddmfi.com").password("sdfsdfsdf").build();
        gson = new Gson();
        String s = gson.toJson(dto);
        //then
        mockMvc.perform(post("/users/login").contentType(MediaType.APPLICATION_JSON).content(s)).andExpect(status().is2xxSuccessful()).andExpect(jsonPath("$.status").value(HttpStatus.UNAUTHORIZED.value())).andExpect(jsonPath("$.message").value("Unauthorized")).andDo(print());
    }

//    @Test
//    void 추가_정보_저장() throws Exception{
//        Optional<User> byId = userRepository.findById(1L);
//        System.out.println("++++++++++++++"+byId.get().getEmail());
//        //given
//        UserDto.PostMoreInfo newDto = UserDto.PostMoreInfo.builder().userId(2L).address("서울시 동대문구 압구정동").displayName("김삿갓").realName("김김감").phone("101020302323").build();
//        //when
//        String s = gson.toJson(newDto);
//        //then
//        mockMvc.perform(post("/users/more-info").contentType(MediaType.APPLICATION_JSON).content(s))
//                .andExpect(status().is2xxSuccessful())
//                .andDo(print());
//    }

    private void jwt_join(){
        UserDto.Post userDto = UserDto.Post.builder().address("sdfsdfsdfsdfsdfsd").displayName("test").realName("sdf").email("tkfkd@ddmfi.com").password("sdfsdfsdf").phone("2393949494").build();
        User user1 = mapper.dtoToUser(userDto);
        userService.joinUser(user1);
    }
    private void ouath_join(){
        User user = User.builder().email("tkfka156@gmail.com").providerId("sdfsdf").provider("naver").oauthId("sdfsdfsdf").password("sdfsdf").build();
        userService.joinUser(user);
    }
}
