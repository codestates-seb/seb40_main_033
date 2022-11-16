package server.team33.user.entity;

import lombok.*;
import server.team33.audit.Auditable;

import javax.persistence.*;
import java.security.Principal;
import java.util.ArrayList;
import java.util.List;


@Getter
@Setter
@Entity
@Table(name = "users")
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class User extends Auditable implements Principal {



    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    @Column(updatable = false)
    private String email;

    @Column(name = "DISPALY_NAME",length = 20)
    private String displayName;

    @Column()
    private String password;

    @Column()
    private String address;

    @Column(name = "real_name")
    private String realName;

    @Column(name = "phone_number", unique = true)
    private String phoneNumber;

    @Column(name = "oauth_id")
    private String oauthId;

    private String provider;

    @Column(name = "provider_id")
    private String providerId;

    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> roles = new ArrayList<>();

    @Enumerated(value = EnumType.STRING)
    private UserStatus userStatus = UserStatus.USER_ACTIVE;

    @Override
    public String getName(){
        return getPhoneNumber();
    }

    //    private List<Wish> wishList;
//    private List<Order> orders;
//    private List<Review> reviews;
//    private List<Talk> talks;
//    private List<TalkComment> talkComments;
//    private Cart cart;
    //추가될게 있을 듯...

    }


