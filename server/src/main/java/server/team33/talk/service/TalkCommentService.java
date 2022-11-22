package server.team33.talk.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import server.team33.exception.bussiness.BusinessLogicException;
import server.team33.exception.bussiness.ExceptionCode;
import server.team33.talk.entity.TalkComment;
import server.team33.talk.repository.TalkCommentRepository;
import server.team33.user.entity.User;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class TalkCommentService {

    private final TalkCommentRepository talkCommentRepository;

    public TalkComment createTalkComment(TalkComment talkComment) {

        return talkCommentRepository.save(talkComment);
    }

    public TalkComment updateTalkComment(TalkComment talkComment) {
        TalkComment findTalkComment = findTalkComment(talkComment.getTalkCommentId());
        findTalkComment.setContent(talkComment.getContent());

        return talkCommentRepository.save(findTalkComment);
    }

    public TalkComment findTalkComment(long talkCommentId) {
        TalkComment talkComment = findVerifiedTalkComment(talkCommentId);

        return talkComment;
    }

    public List<TalkComment> findTalkComments(User user) {
        List<TalkComment> commentsByUser = talkCommentRepository.findAllByUser(user);

        return commentsByUser;
    }

    public void deleteTalk(long talkCommentId, long userId) {
        TalkComment talkComment = findVerifiedTalkComment(talkCommentId);
        long writerId = findTalkCommentWriter(talkCommentId);

        if(userId != writerId) {
            throw new BusinessLogicException(ExceptionCode.ACCESS_DENIED_USER);
        }

        talkCommentRepository.delete(talkComment);
    }

    public long findTalkCommentWriter(long talkCommentId) {
        TalkComment talkComment = findVerifiedTalkComment(talkCommentId);

        return talkComment.getUser().getUserId();
    }

    public TalkComment findVerifiedTalkComment(long talkCommnetId) {
        Optional<TalkComment> optionalTalkComment = talkCommentRepository.findById(talkCommnetId);
        TalkComment findTalkComment = optionalTalkComment.orElseThrow(
                () -> new BusinessLogicException(ExceptionCode.TALK_NOT_FOUND));

        return findTalkComment;
    }
}
