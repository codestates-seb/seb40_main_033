package server.team33.user.entity;

import lombok.*;
import server.team33.audit.Auditable;
import server.team33.cart.entity.Cart;
import server.team33.order.entity.Order;
import server.team33.wish.entity.Wish;

import javax.persistence.*;
import java.security.Principal;
import java.util.ArrayList;
import java.util.List;


@Getter
@Setter
@Entity
@Table(name = "USERS")
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class User extends Auditable implements Principal {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    @Column(updatable = false)
    private String email;

    @Column(name = "DISPALY_NAME", length = 20)
    private String displayName;

    @Column()
    private String password;

    @Column()
    private String address;
    @Column(name = "Datail_ADDRESS")

    private String detailAddress;

    @Column(name = "REAL_NAME")
    private String realName;

    @Column(unique = true)
    private String phone;

    @Column(name = "OAUTH_ID")
    private String oauthId;

    private String provider;

    @Column(name = "PROVIDER_ID")
    private String providerId;

    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> roles = new ArrayList<>();

    @Enumerated(value = EnumType.STRING)
    private UserStatus userStatus = UserStatus.USER_ACTIVE;

    @OneToOne(cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
    private Cart cart;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL) // user가 삭제될 경우 연관관계 wish 도 같이 삭제되도록 설정.
    private List<Wish> wishList = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Order> orders = new ArrayList<>();

        //    @OneToMany(mappedBy = "user")
//    private List<Review> reviews = new ArrayList<>();
//
//    @OneToMany(mappedBy = "user")
//    private List<Talk> talks = new ArrayList<>();
//
//
//    @OneToMany(mappedBy = "user")
//    private List<TalkComment> talkComments = new ArrayList<>();
    @Override
    public String getName(){
        return getEmail();
    }


}


