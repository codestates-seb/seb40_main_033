package server.team33.user.entity;

import lombok.*;
import server.team33.audit.Auditable;
import server.team33.cart.entity.Cart;

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

    @Column(name = "DISPALY_NAME", length = 20)
    private String displayName;

    @Column()
    private String password;

    @Column()
    private String address;

    @Column(name = "real_name")
    private String realName;

    @Column(unique = true)
    private String phone;

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
        return getEmail();
    }

    @OneToOne(cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
    private Cart cart;

    //        private List<Wish> wishList;
    //    private List<Order> orders;
//    @OneToMany(mappedBy = "user")
//    private List<Review> reviews = new ArrayList<>();
//
//    @OneToMany(mappedBy = "user")
//    private List<Talk> talks = new ArrayList<>();
//
//
//    @OneToMany(mappedBy = "user")
//    private List<TalkComment> talkComments = new ArrayList<>();


}


