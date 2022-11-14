package server.team33.user.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;


@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "users")
public class User  {
//TODO : audit 적용
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    @Column(nullable = false, updatable = false, unique = true)
    private String email;

    @Column(length = 20, unique = true)
    private String diplayName;

    @Column(nullable = false)
    private String password;

    @Column
    private String address;

    @Column
    private String realName;

    @Column
    private String phoneNumber;

    @Column
    private String oauthId;

    @Column
    private String provider;

    @Column
    private String providerId;

    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> roles = new ArrayList<>();

    @Column(nullable = false)
    private UserStatus userStatus = UserStatus.USER_ACTIVE;
//    private List<Wish> wishList;
//    private List<Order> orders;
//    private List<Review> reviews;
//    private List<Talk> talks;
//    private List<TalkComment> talkComments;
//    private Cart cart;
    //추가될게 있을 듯...



    }


