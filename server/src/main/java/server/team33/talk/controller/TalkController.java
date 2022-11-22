package server.team33.talk.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import server.team33.item.mapper.ItemMapper;
import server.team33.item.service.ItemService;
import server.team33.order.service.OrderService;
import server.team33.response.MultiResponseDto;
import server.team33.response.SingleResponseDto;
import server.team33.talk.dto.TalkDto;
import server.team33.talk.dto.TalkOrCommentDto;
import server.team33.talk.entity.Talk;
import server.team33.talk.entity.TalkComment;
import server.team33.talk.mapper.TalkMapper;
import server.team33.talk.service.TalkCommentService;
import server.team33.talk.service.TalkService;
import server.team33.user.entity.User;
import server.team33.user.service.UserService;

import javax.validation.constraints.Positive;
import java.util.List;

@Slf4j
@Validated
@CrossOrigin
@RestController
@RequestMapping("/talks")
@RequiredArgsConstructor
public class TalkController {
    private final TalkService talkService;
    private final TalkMapper talkMapper;
    private final TalkCommentService commentService;

    private final UserService userService;
    private final ItemService itemService;
    private final ItemMapper itemMapper;
    private final OrderService orderService;

    @PostMapping("/{item-id}") // 주문 상세 내역에서 작성
    public ResponseEntity postTalk(@PathVariable("item-id") @Positive long itemId,
                                   @RequestBody TalkDto talkDto) {

        Talk talk = talkService.createTalk(
                talkMapper.talkDtoToTalk(itemId, userService, orderService, itemService, talkDto));

        return  new ResponseEntity<>(
                new SingleResponseDto<>(talkMapper.talkToTalkResponseDto(talk)), HttpStatus.CREATED);
    }

    @PatchMapping("/{talk-id}")
    public ResponseEntity updateTalk(@PathVariable("talk-id") @Positive long talkId,
                                     @RequestBody TalkDto talkDto) {

        Talk talk = talkMapper.talkDtoToTalk(talkId, userService, talkService, talkDto);

        Talk updatedTalk = talkService.updateTalk(talk);

        return new ResponseEntity<>(new SingleResponseDto<>(
                talkMapper.talkToTalkResponseDto(updatedTalk)), HttpStatus.OK);
    }

    @GetMapping("/{talk-id}")
    public ResponseEntity getTalk(@PathVariable("talk-id") @Positive long talkId) {

        Talk talk = talkService.findTalk(talkId);

        return new ResponseEntity<>(new SingleResponseDto<>(
                talkMapper.talkToTalkResponseDto(talk)), HttpStatus.OK);
    }

    @GetMapping("/mypage") // 유저가 작성한 토크, 토크 코멘트 한번에 ! 토크일 경우 토크에 달린 코멘트는 X
    public ResponseEntity getUserTalk(Pageable pageable) {

        User user = userService.getLoginUser();
        List<Talk> talks = talkService.findTalks(user);
        List<TalkComment> talkComments = commentService.findTalkComments(user);

        List<TalkOrCommentDto> talkOrCommentDtos = talkMapper.toTalkOrCommentDtos(talks, talkComments, itemMapper);
        Page<TalkOrCommentDto> talkOrCommentDtoPage = talkMapper.toPageDtos(pageable, talkOrCommentDtos);

        return new ResponseEntity<>(new MultiResponseDto<>(talkOrCommentDtos, talkOrCommentDtoPage), HttpStatus.OK);
    }

    @DeleteMapping("/{talk-id}")
    public ResponseEntity deleteTalk(@PathVariable("talk-id") @Positive long talkId) {

        User user = userService.getLoginUser();
        talkService.deleteTalk(talkId, user.getUserId());

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
