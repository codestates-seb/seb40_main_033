package server.team33.talk.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import server.team33.talk.entity.TalkComment;
import server.team33.user.entity.User;

import java.util.List;

public interface TalkCommentRepository extends JpaRepository<TalkComment, Long> {

    List<TalkComment> findAllByUser(User user);
}
