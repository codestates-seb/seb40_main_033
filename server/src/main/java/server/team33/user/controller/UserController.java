package server.team33.user.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import server.team33.user.logout.Logout;
import server.team33.user.dto.UserSignUpDto;
import server.team33.user.entity.User;
import server.team33.user.mapper.UserMapper;
import server.team33.user.service.UserService;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

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
    public ResponseEntity singUpUser( @Valid @RequestBody UserSignUpDto userSignUpDto ){
        User user = mapper.userSignUpDtoToUser(userSignUpDto);
        log.error("user = {}", user.getUserStatus());
        log.error("user = {}", user.getEmail());
        userService.joinUser(user);

        return new ResponseEntity(HttpStatus.CREATED);
    }

    @GetMapping("/logout")
    public ResponseEntity handleLogout( HttpServletRequest request ){
       logout.doLogout(request);
       return new ResponseEntity(HttpStatus.ACCEPTED);
    }



}
