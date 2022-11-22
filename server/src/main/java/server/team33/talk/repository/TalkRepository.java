package server.team33.talk.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import server.team33.talk.entity.Talk;
import server.team33.user.entity.User;

import java.util.List;

public interface TalkRepository extends JpaRepository<Talk, Long> {

    List<Talk> findAllByUser(User user);
}
