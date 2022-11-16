package server.team33.user.entity;

import lombok.*;
import server.team33.audit.Auditable;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;


@Getter
@Setter
@Entity
@Table(name = "users")
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    @Column(nullable = false, updatable = false)
    private String email;

    @Column(length = 20, unique = true)
    private String diplayName;

    @Column(nullable = false)
    private String password;

    @Column
    private String address;

    @Column
    private String realName;

    @Column(unique = true)
    private String phoneNumber;

    @Column
    private String oauthId;

    @Column
    private String provider;

    @Column
    private String providerId;

    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> roles = new ArrayList<>();

    @Enumerated(value = EnumType.STRING)
    private UserStatus userStatus = UserStatus.USER_ACTIVE;

    //    private List<Wish> wishList;
//    private List<Order> orders;
//    private List<Review> reviews;
//    private List<Talk> talks;
//    private List<TalkComment> talkComments;
//    private Cart cart;
    //추가될게 있을 듯...



    }


