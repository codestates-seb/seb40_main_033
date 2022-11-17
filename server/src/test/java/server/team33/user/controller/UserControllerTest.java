package server.team33.user.controller;

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
import server.team33.user.dto.UserDto;
import server.team33.user.entity.User;
import server.team33.user.mapper.UserMapper;
import server.team33.user.service.UserService;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

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

    @BeforeEach
    void init() throws Exception{

        UserDto.Post userDto = UserDto.Post.builder().address("sdfsdfsdfsdfsdfsd").displayName("test").realName("sdf").email("tkfkd@ddmfi.com").password("sdfsdfsdf").phone("2393949494").build();
        User user1 = mapper.dtoToUser(userDto);
        userService.joinUser(user1);
        LoginDto dto = LoginDto.builder().username("tkfkd@ddmfi.com").password("sdfsdfsdf").build();

        gson = new Gson();
        String s = gson.toJson(dto);
        ResultActions perform = mockMvc.perform(post("/users/login").contentType(MediaType.APPLICATION_JSON).content(s));
        authorization = perform.andReturn().getResponse().getHeader("Authorization");
    }
    @Test
    void 회원정보_보내기() throws Exception {

        mockMvc.perform(get("/users").header("Authorization", authorization))
                .andExpect(status().is2xxSuccessful())
                .andExpect(jsonPath("$.address").value("sdfsdfsdfsdfsdfsd"))
                .andExpect(jsonPath("$.displayName").value("test"))
                .andExpect(jsonPath("$.realName").value("sdf"))
                .andExpect(jsonPath("$.email").value("tkfkd@ddmfi.com"))
                .andExpect(jsonPath("$.phone").value("2393949494"))
                .andDo(print());
    }
    @Test
    void 회원_이름_수정() throws Exception{

        UserDto.Post newDto = UserDto.Post.builder().address("서울시 동대문구 압구정동").displayName("김삿갓").realName("김김감").email("tkfkd@ddmfi.com").password("dlszheldektl").phone("101020302323").build();
        String s1 = gson.toJson(newDto);
        //then
        mockMvc.perform(patch("/users").header("Authorization",authorization).contentType(MediaType.APPLICATION_JSON).content(s1))
                .andExpect(status().is2xxSuccessful())
                .andExpect(jsonPath("$.address").value("서울시 동대문구 압구정동"))
                .andExpect(jsonPath("$.displayName").value("김삿갓"))
                .andExpect(jsonPath("$.realName").value("김김감"))
                .andExpect(jsonPath("$.phone").value("101020302323"))
                .andDo(print());
    }

}