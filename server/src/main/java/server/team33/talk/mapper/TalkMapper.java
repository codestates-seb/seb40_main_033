package server.team33.talk.mapper;

import org.mapstruct.Mapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import server.team33.exception.bussiness.BusinessLogicException;
import server.team33.exception.bussiness.ExceptionCode;
import server.team33.item.mapper.ItemMapper;
import server.team33.item.service.ItemService;
import server.team33.order.service.OrderService;
import server.team33.talk.dto.*;
import server.team33.talk.entity.Talk;
import server.team33.talk.entity.TalkComment;
import server.team33.talk.service.TalkCommentService;
import server.team33.talk.service.TalkService;
import server.team33.user.entity.User;
import server.team33.user.service.UserService;

import java.util.ArrayList;
import java.util.List;

@Mapper(componentModel = "spring")
public interface TalkMapper {

    default Talk talkDtoToTalk(long itemId, UserService userService, OrderService orderService,
                                     ItemService itemService, TalkDto talkDto) { // 토크 등록

        Talk talk = new Talk();
        talk.setItem(itemService.findVerifiedItem(itemId));
        talk.setUser(userService.getLoginUser());
        talk.setContent(talkDto.getContent());
        talk.setShopper(orderService.isShopper(itemId, talk.getUser().getUserId()));

        return talk;
    }

    default Talk talkDtoToTalk(long talkId, UserService userService,
                               TalkService talkService, TalkDto talkDto) { // 수정

        User user = userService.getLoginUser();

        if(user.getUserId() != talkService.findTalkWriter(talkId)) {
            throw new BusinessLogicException(ExceptionCode.ACCESS_DENIED_USER);
        } // 토크 작성자만 토크를 수정할 수 있음

        Talk talk = new Talk();
        talk.setTalkId(talkId);
        talk.setUser(user);
        talk.setContent(talkDto.getContent());

        return talk;
    }

    default TalkResponseDto talkToTalkResponseDto(Talk talk) {

        TalkResponseDto talkResponseDto = new TalkResponseDto();
        talkResponseDto.setTalkId(talk.getTalkId());
        talkResponseDto.setItemId(talk.getItem().getItemId());
        talkResponseDto.setUserId(talk.getUser().getUserId());
        talkResponseDto.setDisplayName(talk.getUser().getDisplayName());
        talkResponseDto.setContent(talk.getContent());
        talkResponseDto.setShopper(talk.isShopper());
        talkResponseDto.setCreatedAt(talk.getCreatedAt());
        talkResponseDto.setUpdatedAt(talk.getUpdatedAt());

        return talkResponseDto;
    }

    default List<TalkResponseDto> talksToTalkResponseDtos(List<Talk> talks) {

        if(talks == null) return null;

        List<TalkResponseDto> talkResponseDtos = new ArrayList<>();

        for(Talk talk : talks) {
            talkResponseDtos.add(talkToTalkResponseDto(talk));
        }

        return talkResponseDtos;
    }

    default TalkAndCommentDto talkToTalkAndCommentDto(Talk talk) {

        TalkAndCommentDto talkAndCommentDto = new TalkAndCommentDto();
        talkAndCommentDto.setTalkId(talk.getTalkId());
        talkAndCommentDto.setUserId(talk.getUser().getUserId());
        talkAndCommentDto.setItemId(talk.getItem().getItemId());
        talkAndCommentDto.setContent(talk.getContent());
        talkAndCommentDto.setShopper(talk.isShopper());
        talkAndCommentDto.setCreatedAt(talk.getCreatedAt());
        talkAndCommentDto.setUpdatedAt(talk.getUpdatedAt());

        List<TalkCommentDto> talkCommentDtos = talkCommentsToTalkCommentDtos(talk.getTalkComments());
        talkAndCommentDto.setTalkComments(talkCommentDtos);

        return talkAndCommentDto;
    }

    default List<TalkAndCommentDto> talksToTalkAndCommentDtos(List<Talk> talks) {

        if(talks == null) return null;

        List<TalkAndCommentDto> talkAndCommentDtos = new ArrayList<>();

        for(Talk talk : talks) {
            talkAndCommentDtos.add(talkToTalkAndCommentDto(talk));
        }
        return talkAndCommentDtos;
    }

    default TalkDetailResponseDto talkToTalkDetailResponseDto(Talk talk, ItemMapper itemMapper) {

        TalkDetailResponseDto talkResponseDto = new TalkDetailResponseDto();
        talkResponseDto.setTalkId(talk.getTalkId());
        talkResponseDto.setUserId(talk.getUser().getUserId());
        talkResponseDto.setItem(itemMapper.itemToItemSimpleResponseDto(talk.getItem()));
        talkResponseDto.setContent(talk.getContent());
        talkResponseDto.setShopper(talk.isShopper());
        talkResponseDto.setCreatedAt(talk.getCreatedAt());
        talkResponseDto.setUpdatedAt(talk.getUpdatedAt());

        return talkResponseDto;
    }

    default List<TalkDetailResponseDto> talksToTalkDetailResponseDtos(List<Talk> talks, ItemMapper itemMapper) {

        if(talks == null) return null;

        List<TalkDetailResponseDto> talkResponseDtos = new ArrayList<>();

        for(Talk talk : talks) {
            talkResponseDtos.add(talkToTalkDetailResponseDto(talk, itemMapper));
        }

        return talkResponseDtos;
    }

    default TalkComment talkDtoToTalkComment(long itemId, long talkId, UserService userService, OrderService orderService,
                                             TalkService talkService, ItemService itemService, TalkDto talkDto) { // 토크 코멘트 등록

        TalkComment comment = new TalkComment();
        comment.setTalk(talkService.findVerifiedTalk(talkId));
        comment.setItem(itemService.findVerifiedItem(itemId));
        comment.setUser(userService.getLoginUser());
        comment.setContent(talkDto.getContent());
        comment.setShopper(orderService.isShopper(itemId, comment.getUser().getUserId()));

        return comment;
    }

    default TalkComment talkDtoToTalkComment(long talkCommentId, UserService userService,
                                             TalkCommentService commentService, TalkDto talkDto) { // 토크 코멘트 수정

        User user = userService.getLoginUser();

        if(user.getUserId() != commentService.findTalkCommentWriter(talkCommentId)) {
            throw new BusinessLogicException(ExceptionCode.ACCESS_DENIED_USER);
        } // 코멘트 작성자만 수정 가능

        TalkComment talkComment = new TalkComment();
        talkComment.setTalkCommentId(talkCommentId);
        talkComment.setUser(user);
        talkComment.setContent(talkDto.getContent());

        return talkComment;
    }

    default TalkCommentDto talkCommentToTalkCommentDto(TalkComment talkComment) { // 상세페이지
        TalkCommentDto commentDto = new TalkCommentDto();
        commentDto.setTalkCommentId(talkComment.getTalkCommentId());
        commentDto.setUserId(talkComment.getUser().getUserId());
        commentDto.setDisplayName(talkComment.getUser().getDisplayName());
        commentDto.setContent(talkComment.getContent());
        commentDto.setShopper(talkComment.isShopper());
        commentDto.setCreatedAt(talkComment.getCreatedAt());
        commentDto.setUpdatedAt(talkComment.getUpdatedAt());

        return commentDto;
    }

    default List<TalkCommentDto> talkCommentsToTalkCommentDtos(List<TalkComment> talkComments) {

        if(talkComments == null) return null;

        List<TalkCommentDto> talkCommentDtos = new ArrayList<>();

        for(TalkComment talkComment : talkComments) {
            talkCommentDtos.add(talkCommentToTalkCommentDto(talkComment));
        }

        return talkCommentDtos;
    }

    default TalkOrCommentDto toTalkOrCommentDto(Talk talk, ItemMapper itemMapper) { // 마이페이지 - 토크 조회
        TalkOrCommentDto talkOrCommentDto = new TalkOrCommentDto();
        talkOrCommentDto.setTalkId(talk.getTalkId());
        talkOrCommentDto.setItem(itemMapper.itemToItemSimpleResponseDto(talk.getItem()));
        talkOrCommentDto.setContent(talk.getContent());
        talkOrCommentDto.setReply(false);
        talkOrCommentDto.setCreatedAt(talk.getCreatedAt());
        talkOrCommentDto.setUpdatedAt(talk.getUpdatedAt());

        return talkOrCommentDto;
    }

    default TalkOrCommentDto toTalkOrCommentDto(TalkComment talkComment, ItemMapper itemMapper) { // 마이페이지 - 토크 조회
        TalkOrCommentDto talkOrCommentDto = new TalkOrCommentDto();
        talkOrCommentDto.setTalkCommentId(talkComment.getTalkCommentId());
        talkOrCommentDto.setItem(itemMapper.itemToItemSimpleResponseDto(talkComment.getItem()));
        talkOrCommentDto.setContent(talkComment.getContent());
        talkOrCommentDto.setReply(true);
        talkOrCommentDto.setCreatedAt(talkComment.getCreatedAt());
        talkOrCommentDto.setUpdatedAt(talkComment.getUpdatedAt());

        return talkOrCommentDto;
    }

    default List<TalkOrCommentDto> toTalkOrCommentDtos(List<Talk> talks,
                                                       List<TalkComment> talkComments, ItemMapper itemMapper) {

        if(talks == null && talkComments == null) return null;

        List<TalkOrCommentDto> talkOrCommentDtos = new ArrayList<>();

        for(Talk talk : talks) {
            talkOrCommentDtos.add(toTalkOrCommentDto(talk, itemMapper));
        }

        for(TalkComment talkComment : talkComments) {
            talkOrCommentDtos.add(toTalkOrCommentDto(talkComment, itemMapper));
        }

        return talkOrCommentDtos;
    }

    default Page<TalkOrCommentDto> toPageDtos(Pageable pageable, List<TalkOrCommentDto> talkOrCommentDtos) {
        return new PageImpl<>(talkOrCommentDtos);
    }

}
