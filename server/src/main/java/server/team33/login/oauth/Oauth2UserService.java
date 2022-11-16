package server.team33.login.oauth;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import server.team33.login.details.PrincipalDetails;
import server.team33.login.oauth.provider.*;
import server.team33.user.entity.AuthUtils;
import server.team33.user.entity.User;
import server.team33.user.repository.UserRepository;

import java.util.*;

@Service
@Slf4j
@RequiredArgsConstructor
public class Oauth2UserService extends DefaultOAuth2UserService {

    private final UserRepository userRepository;
    private final AuthUtils authUtils;
    private OAuth2UserInfo oAuth2UserInfo;

    private PasswordEncoder encodePwd(){
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }


    //구글에서 받은 userrequest 데이터에 대한 후처리되는 함수
    @Override
    public OAuth2User loadUser( OAuth2UserRequest userRequest ) throws OAuth2AuthenticationException{
        OAuth2User oauth2User = super.loadUser(userRequest);
        OAuth2UserInfo oauth2UserInfo = getOAuth2UserInfo(userRequest, oauth2User);

        return getPrincipaDetails(oauthToJoin(oauth2UserInfo, oauth2User), oauth2User);
    }

    private OAuth2UserInfo getOAuth2UserInfo( OAuth2UserRequest userRequest, OAuth2User oauth2User ){
        if(userRequest.getClientRegistration().getRegistrationId().equals("google"))
            oAuth2UserInfo = new GoogleUserInfo(oauth2User.getAttributes());

        if(userRequest.getClientRegistration().getRegistrationId().equals("facebook"))
            oAuth2UserInfo = new FacebookUserInfo(oauth2User.getAttributes());

        if(userRequest.getClientRegistration().getRegistrationId().equals("naver"))
            oAuth2UserInfo = new NaverUserInfo((Map<String, Object>) oauth2User.getAttributes().get("response"));

        if(userRequest.getClientRegistration().getRegistrationId().equals("kakao"))
            oAuth2UserInfo = new KakaoUserInfo(oauth2User.getAttributes(), (Map<String, Object>) oauth2User.getAttributes().get("kakao_account"));

        return oAuth2UserInfo;
    }

    private Map<String, String> oauthToJoin( OAuth2UserInfo oAuth2UserInfo, OAuth2User oAuth2User ){
        Map<String, String> userInfo = new HashMap<>();
        log.info("멤버 강제 회원가입");

        userInfo.put("provider", oAuth2UserInfo.getProvider());
        log.info("prvoider : {}", userInfo.get("provider"));

        userInfo.put("providerId", oAuth2UserInfo.getProviderId());
        log.info("prvoiderId : {}", userInfo.get("providerId"));

        userInfo.put("oauthId", oAuth2UserInfo.getProvider() + "-" + oAuth2UserInfo.getProviderId());
        log.info("oauthId : {}", userInfo.get("oauthId"));

        userInfo.put("email", oAuth2UserInfo.getEmail());
        log.info("email : {}", userInfo.get("email"));

        return userInfo;
    }

    private PrincipalDetails getPrincipaDetails( Map<String, String> userInfo, OAuth2User oauth2User ){
        //        String provider = oAuth2UserInfo.getProvider();
        //
        //        String provideId = oAuth2UserInfo.getProviderId();
        //
        //        String oauthId = provider + "_" + provideId;
        //
        //        String password = encodePwd().encode("의미없음");
        //
        //        String email = oAuth2UserInfo.getEmail();
        //
        //        List<String> role = authUtils.createRoles();


        Optional<User> userEntity = userRepository.findByOauthId(userInfo.get("oauthId"));

        if(userEntity.isPresent()) return new PrincipalDetails(userEntity.get(), oauth2User.getAttributes());

        log.info("소셜 회원가입");
        User newEntity = User.builder()
                .oauthId(userInfo.get("oauthId"))
                .provider(userInfo.get("provider"))
                .providerId(userInfo.get("providerId"))
                .email(userInfo.get("email"))
                .password(encodePwd().encode("임의의 비밀번호"))
                .roles(authUtils.createRoles())
                .build();

        userRepository.save(newEntity);

        log.info("회원저장완료");

        return new PrincipalDetails(newEntity, oauth2User.getAttributes());
    }
}
