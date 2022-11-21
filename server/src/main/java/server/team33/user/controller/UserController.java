package server.team33.user.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import server.team33.logout.Logout;
import server.team33.user.dto.UserDto;
import server.team33.user.entity.User;
import server.team33.user.mapper.UserMapper;
import server.team33.user.service.UserService;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.io.IOException;

@Slf4j
@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
@Validated
public class UserController {
    private final Logout logout;
    private final UserMapper mapper;
    private final UserService userService;

    @PostMapping
    public ResponseEntity singUpUser( @Valid @RequestBody UserDto.Post userDto ){
        User user = mapper.dtoToUser(userDto);
        log.error("user = {}", user.getUserStatus());
        log.error("user = {}", user.getEmail());
        userService.joinUser(user);

        return new ResponseEntity(HttpStatus.CREATED);
    }

    @PostMapping("/more-info")
    public ResponseEntity moreInfo(@Valid @RequestBody UserDto.PostMoreInfo userDto, HttpServletResponse response ) throws IOException{
        User user = userService.updateOAuthInfo(userDto);
        userService.giveToken(user,response);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }


    @PatchMapping
    public ResponseEntity updateInfo( @Valid @RequestBody UserDto.Post userDto ){
        log.error("컨트롤러 진입");
        User user = userService.updateUser(userDto);
        UserDto.Response userInfo = mapper.userToDto(user, HttpMethod.PATCH);
        return new ResponseEntity(userInfo, HttpStatus.ACCEPTED);
    }

    @GetMapping
    public ResponseEntity getUserInfo(){
        User loginUser = userService.getLoginUser();
        UserDto.Response userInfo = mapper.userToDto(loginUser, HttpMethod.GET);
        return new ResponseEntity<>(userInfo, HttpStatus.ACCEPTED);
    }

    @GetMapping("/logout")
    public ResponseEntity handleLogout( HttpServletRequest request ){
        logout.doLogout(request);
        return new ResponseEntity(HttpStatus.ACCEPTED);
    }

    @DeleteMapping
    public ResponseEntity deleteUser( HttpServletRequest request ){
        User user = userService.deleteUser();
        logout.doLogout(request);
        return new ResponseEntity<>(user.getUserStatus().getStatus(), HttpStatus.ACCEPTED);
    }


//테스트 컨트롤러
//    @GetMapping("/test")
//    public String home(@RequestParam(name = "access_token") String accessToken){
//        return accessToken;
//    }

}
