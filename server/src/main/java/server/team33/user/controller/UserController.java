package server.team33.user.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import server.team33.user.dto.UserSignUpDto;
import server.team33.user.entity.User;
import server.team33.user.mapper.UserMapper;
import server.team33.user.service.UserService;

import javax.validation.Valid;

@Slf4j
@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
@Validated
public class UserController {
   private final UserMapper mapper;
   private final UserService userService;

   @PostMapping
    public ResponseEntity singUpUser( @Valid @RequestBody UserSignUpDto userSignUpDto ){
        User user = mapper.userSignUpDtoToUser(userSignUpDto);
        userService.joinUser(user);

        return new ResponseEntity(HttpStatus.CREATED);
    }

}
