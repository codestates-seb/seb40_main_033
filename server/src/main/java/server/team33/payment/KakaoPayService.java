package server.team33.payment;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

@Service
@Slf4j
public class KakaoPayService {
    private MultiValueMap<String, String> parameters;
    private HttpEntity<MultiValueMap<String, String>> requestEntity;

    private String url;

    public ReadyResponse payReady( int totalAmount ){
        // order_id를 구하는 과정이라고 생각하면 될듯
        //        User user =  (User)SessionUtils.getAttribute("LOGIN_USER");
        //        List<CartDto> carts = cartMapper.getCartByUserNo(user.getNo());
        //
        //        String[] cartNames = new String[carts.size()];
        //        for(CartDto cart: carts) {
        //            for(int i=0; i< carts.size(); i++) {
        //                cartNames[i] = cart.getClassTitle();
        //            }
        //        }
        //        String itemName = cartNames[0] + " 그외" + (carts.size()-1);
        //        log.info("강좌이름들:"+itemName);
        //        String order_id = user.getNo() + itemName;

        parameters = new LinkedMultiValueMap<>();
        parameters.add("cid", "TC0ONETIME");
        parameters.add("partner_order_id", "주문아이디");
        parameters.add("partner_user_id", "pillivery");
        parameters.add("item_name", "영양제");
        parameters.add("quantity", "2");
        parameters.add("total_amount", String.valueOf(totalAmount));
        parameters.add("tax_free_amount", "0");
        parameters.add("approval_url", "http://localhost:8080");
        parameters.add("cancel_url", "http://localhost:8080");
        parameters.add("fail_url", "http://localhost:8080");
        log.info("parameters = {}", parameters);

        requestEntity = new HttpEntity<>(parameters, getHeader());
        log.warn("request = {}", requestEntity);
        log.warn("headers = {}",getHeader());
        url = "https://kapi.kakao.com/v1/payment/ready";
        RestTemplate restTemplate = new RestTemplate();
        restTemplate.setRequestFactory(new HttpComponentsClientHttpRequestFactory());
        ReadyResponse readyResponse = restTemplate.postForObject(url, requestEntity, ReadyResponse.class);
        log.warn("여기는 통과??");
        log.info("결제 준비 응답객체 " + readyResponse);
        return readyResponse;
    }

    public ApproveResponse payApprove( String tid, String pgToken ){
        //orderId
        //        User user =  (User)SessionUtils.getAttribute("LOGIN_USER");
        //        List<CartDto> carts = cartMapper.getCartByUserNo(user.getNo());
        //        // 주문명 만들기.
        //        String[] cartNames = new String[carts.size()];
        //        for(CartDto cart: carts) {
        //            for(int i=0; i< carts.size(); i++) {
        //                cartNames[i] = cart.getClassTitle();
        //            }
        //        }
        //        String itemName = cartNames[0] + " 그외" + (carts.size()-1);
        //
        //        String order_id = user.getNo() + itemName;
        parameters = new LinkedMultiValueMap<>();
        parameters.add("cid", "TC0ONETIME");
        parameters.add("tid", tid);
        parameters.add("partner_order_id", "주문 아이디");
        parameters.add("partner_user_id", "pillivery");
        parameters.add("pg_token", pgToken);

        requestEntity = new HttpEntity<>(parameters, getHeader());
        url = "https://kapi.kakao.com/v1/payment/approve";
        RestTemplate restTemplate = new RestTemplate();
        restTemplate.setRequestFactory(new HttpComponentsClientHttpRequestFactory());
        ApproveResponse approveResponse = restTemplate.postForObject(url, requestEntity, ApproveResponse.class);
        log.info("결제 승인 응답 객체" + approveResponse);

        return approveResponse;
    }

    //        String url = "https://kapi.kakao.com/v1/payment/approve";
    //        ApproveResponse approveResponse = restTemplate.postForObject(url, requestEntity, ApproveResponse.class);
    //        log.info("결제승인 응답 객체 " + approveResponse);
    //        return

    private HttpHeaders getHeader(){
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.set("Authorization", "KakaoAK 15fe252b3ce1d6da44b790e005f40964");
        httpHeaders.set("Content-type", "application/x-www-form-urlencoded;charset=utf-8");
        return httpHeaders;
    }


}
