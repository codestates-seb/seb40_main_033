package server.team33.login.oauth.provider;

import java.util.Map;

public class KakaoUserInfo implements OAuth2UserInfo {

    private  Map<String, Object> attributes1;
    private  Map<String, Object> attributes2;


    public KakaoUserInfo( Map<String, Object> attributes1,Map<String, Object> attributes2 ){
        this.attributes1 = attributes1;
        this.attributes2 = attributes2;
    }

    @Override
    public String getProviderId(){
        return String.valueOf(attributes1.get("id"));
    }

    @Override
    public String getProvider(){
        return "kakao";
    }

    @Override
    public String getEmail(){
        return (String) attributes2.get("email");
    }

    @Override
    public String getName(){
        return (String) attributes2.get("name");
    }
}
