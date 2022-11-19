package server.team33.payment.dto;

import lombok.Data;

import java.time.ZoneId;
import java.time.ZonedDateTime;

@Data
public class KakaoPayRequestDto {

    private String tid;
    private String next_redirect_pc_url;
    private ZonedDateTime create_at = ZonedDateTime.now(ZoneId.of("Asia/Seoul"));

}
